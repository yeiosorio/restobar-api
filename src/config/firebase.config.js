const admin = require('firebase-admin');
require('dotenv').config();

// Inicialización de Firebase Admin usando variables de entorno
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();
const db = admin.firestore();

module.exports = {
  admin,
  bucket,
  db
}; 