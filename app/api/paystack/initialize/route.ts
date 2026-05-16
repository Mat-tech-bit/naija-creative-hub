import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { amount, email, contestantId, contestantName, voteCount } = await req.json();

    if (!amount || !email || !contestantId) {
      return NextResponse.json(
        { status: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const secretKey = process.env.PAYSTACK_SECRET_KEY?.trim();

    if (!secretKey) {
      console.error("PAYSTACK_SECRET_KEY is not defined in environment variables");
      return NextResponse.json(
        { status: false, message: "Server configuration error: Payment key missing" },
        { status: 500 }
      );
    }

    // Determine the base URL for the callback
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

    const paystackResponse = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secretKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount * 100, // Paystack expects amount in kobo
        email,
        currency: 'NGN',
        callback_url: `${origin}/contestant/${contestantId}`,
        channels: ['card', 'bank', 'ussd', 'qr', 'mobile_money', 'bank_transfer'],
        metadata: {
          contestantId,
          contestantName,
          voteCount: Number(voteCount),
          email,
          custom_fields: [
            {
              display_name: "Contestant Name",
              variable_name: "contestant_name",
              value: contestantName
            },
            {
              display_name: "Number of Votes",
              variable_name: "vote_count",
              value: voteCount
            }
          ]
        },
      }),
    });

    const data = await paystackResponse.json();

    if (!data.status) {
      return NextResponse.json(
        { status: false, message: data.message || "Paystack initialization failed" },
        { status: 400 }
      );
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Paystack Initialize Error:", error);
    return NextResponse.json(
      { status: false, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
