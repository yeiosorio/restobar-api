const admin = require('firebase-admin');
require('dotenv').config();

// Inicialización de Firebase Admin usando variables de entorno
admin.initializeApp({
  credential: admin.credential.cert({
    project_id: process.env.FIREBASE_PROJECT_ID,
    private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    client_email: process.env.FIREBASE_CLIENT_EMAIL
  }),
  storageBucket: 'restobar-33413.firebaseapp.com'
});

const bucket = admin.storage().bucket();
const db = admin.firestore();

module.exports = {
  admin,
  bucket,
  db
}; 