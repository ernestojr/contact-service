const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://contats-8f747.firebaseio.com",
  databaseAuthVariableOverride: {
    uid: process.env.FIREBASE_ADMIN_UID
  }
});

winston.info('Loaded firebase.')

global.firebase = admin;

module.exports = admin;
