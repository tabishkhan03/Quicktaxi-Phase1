const admin = require("firebase-admin");
const { Message } = require("firebase-admin/messaging");
const { NextRequest, NextResponse } = require("next/server");

// Replace with your Firebase service account details directly
const serviceAccount = {
  "type": "service_account",
  "project_id": "fcm-demo-33514",
  "private_key_id": "38fdfa433f2b4b5e42428478cfb86801dcff1f51",
  "private_key": process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n'),
  "client_email": "firebase-adminsdk-62pb7@fcm-demo-33514.iam.gserviceaccount.com",
  "client_id": "115094679818171965672",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-62pb7%40fcm-demo-33514.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
};

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export async function POST(request) {
  const { token, title, message, link } = await request.json();

  const payload = {
    token,
    notification: {
      title: title,
      body: message,
      imageUrl: "https://cdn-icons-png.flaticon.com/512/1827/1827272.png"
    },
    webpush: link && {
      fcmOptions: {
        link,
      },
    },
  };

  try {
    await admin.messaging().send(payload);

    return NextResponse.json({ success: true, message: "Notification sent!" });
  } catch (error) {
    return NextResponse.json({ success: false, error });
  }
}
