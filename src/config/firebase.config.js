const admin = require('firebase-admin');

// Inicialización de Firebase Admin
const serviceAccount = require('../config/firebase-credentials.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "restobar-33413.firebasestorage.app",
});

const bucket = admin.storage().bucket();
const db = admin.firestore();

module.exports = {
  admin,
  bucket,
  db
}; 