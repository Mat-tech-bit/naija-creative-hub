import * as admin from "firebase-admin";

if (!admin.apps.length) {
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;
  
  if (privateKey) {
    // 1. Remove outer quotes if they exist (standard .env parsing issue)
    privateKey = privateKey.replace(/^"|"$/g, '');
    
    // 2. Handle literal \n and actual newlines
    // This is the most robust way to handle keys in both local and cloud environments
    privateKey = privateKey.replace(/\\n/g, "\n");
    
    // 3. Ensure the key has the correct header/footer
    if (!privateKey.includes("-----BEGIN PRIVATE KEY-----")) {
      console.error("Firebase Admin Private Key is missing the BEGIN header.");
    }
  } else {
    console.error("FIREBASE_ADMIN_PRIVATE_KEY is missing in environment variables.");
  }

  try {
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: privateKey,
      }),
    });
    console.log("Firebase Admin successfully initialized.");
  } catch (error: any) {
    console.error("Firebase Admin initialization error:", error.message);
  }
}

const adminDb = admin.firestore();
const adminAuth = admin.auth();

export { adminDb, adminAuth };
