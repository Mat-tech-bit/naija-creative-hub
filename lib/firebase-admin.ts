import * as admin from "firebase-admin";

const initializeFirebaseAdmin = () => {
  if (admin.apps.length > 0) {
    return admin.apps[0];
  }

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY;

  if (!projectId || !clientEmail || !privateKey) {
    console.warn("Firebase Admin credentials are missing. Skipping initialization.");
    return null;
  }

  try {
    // Handle literal \n, remove all quotes (robust against various env formats), and trim
    privateKey = privateKey.replace(/\\n/g, "\n").replace(/['"]/g, "").trim();

    return admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey,
      }),
    });
  } catch (error: any) {
    console.error("Firebase Admin initialization error:", error.message);
    return null;
  }
};

const app = initializeFirebaseAdmin();

// Export initialized services or null if initialization failed
// Using a getter or checking app helps avoid "default app does not exist" errors during build
export const adminDb = app ? app.firestore() : null as unknown as admin.firestore.Firestore;
export const adminAuth = app ? app.auth() : null as unknown as admin.auth.Auth;
