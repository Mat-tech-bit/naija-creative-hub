import { NextResponse } from "next/server";
import { adminDb } from "@/lib/firebase-admin";
import * as admin from "firebase-admin";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  if (!reference) {
    return NextResponse.json(
      { status: false, message: "No reference provided" },
      { status: 400 }
    );
  }

  try {
    // 1. Verify with Paystack (with retry logic)
    let paystackData;
    let attempts = 0;
    const secretKey = process.env.PAYSTACK_SECRET_KEY?.trim();
    if (!secretKey) throw new Error("Payment secret key is not configured.");

    while (attempts < 3) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); 

        const paystackResponse = await fetch(`https://api.paystack.co/transaction/verify/${reference}`, {
          headers: {
            Authorization: `Bearer ${secretKey}`,
          },
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        paystackData = await paystackResponse.json();
        break; 
      } catch (err: any) {
        attempts++;
        console.warn(`Paystack verification attempt ${attempts} failed: ${err.message}`);
        if (attempts >= 3) throw err;
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }

    if (!paystackData || !paystackData.status || paystackData.data.status !== "success") {
      return NextResponse.json(
        { status: false, message: paystackData?.message || "Payment verification failed" },
        { status: 400 }
      );
    }

    const { metadata, amount } = paystackData.data;
    const { contestantId, email } = metadata;
    const voteCount = Number(metadata.voteCount || 0);
    const contestantName = metadata.contestantName || "Contestant";

    // 2. Process within a transaction (Atomic check and update)
    const voteDocRef = adminDb.collection("votes").doc(reference);
    const contestantRef = adminDb.collection("users").doc(contestantId);
    
    let isAlreadyProcessed = false;

    await adminDb.runTransaction(async (transaction) => {
      const voteDoc = await transaction.get(voteDocRef);
      if (voteDoc.exists) {
        isAlreadyProcessed = true;
        return; // Don't proceed if already processed
      }

      const contestantDoc = await transaction.get(contestantRef);
      if (!contestantDoc.exists) {
        throw new Error("Contestant not found in database.");
      }

      const currentData = contestantDoc.data() || {};
      
      // Update recent voters
      const newVoter = {
        name: email.split('@')[0], 
        votes: voteCount,
        time: new Date().toLocaleTimeString('en-NG', { hour: 'numeric', minute: '2-digit', hour12: true }) + ' today'
      };

      let recentVoters = Array.isArray(currentData.recentVoters) ? currentData.recentVoters : [];
      recentVoters = [newVoter, ...recentVoters].slice(0, 15);

      // Update top supporters
      let topSupporters = Array.isArray(currentData.topSupporters) ? currentData.topSupporters : [];
      const voterIndex = topSupporters.findIndex((s: any) => s.email === email);
      
      if (voterIndex > -1) {
        topSupporters[voterIndex].votes += voteCount;
      } else {
        topSupporters.push({ 
          name: email.split('@')[0], 
          votes: voteCount, 
          email,
          image: "" 
        });
      }
      
      topSupporters.sort((a: any, b: any) => b.votes - a.votes);
      topSupporters = topSupporters.slice(0, 10);

      // Update the contestant document
      transaction.update(contestantRef, {
        votes: admin.firestore.FieldValue.increment(voteCount),
        recentVoters,
        topSupporters,
        lastVoteAt: admin.firestore.Timestamp.now()
      });

      // Record the transaction
      transaction.set(voteDocRef, {
        reference,
        contestantId,
        contestantName,
        voteCount,
        amount: amount / 100,
        email,
        createdAt: admin.firestore.Timestamp.now(),
        status: "success"
      });
    });

    if (isAlreadyProcessed) {
      return NextResponse.json(
        { status: false, message: "This vote has already been recorded.", alreadyProcessed: true },
        { status: 400 }
      );
    }

    return NextResponse.json({
      status: true,
      message: "Success! Your votes have been counted.",
      data: { voteCount, contestantName }
    });

  } catch (error: any) {
    console.error("Verification Error:", error);
    return NextResponse.json(
      { status: false, message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
