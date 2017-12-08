const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  databaseAuthVariableOverride: {
    uid: process.env.FIREBASE_ADMIN_UID
  }
});

app.log.info('Loaded firebase.')

app.firebase = admin;

module.exports = admin;
