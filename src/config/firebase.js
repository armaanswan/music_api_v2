const admin = require('firebase-admin');
const path = require('path');

// Path to your service account key
const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'));

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://music-api-17f57.firebaseio.com'
});

const db = admin.firestore();

module.exports = { admin, db };
