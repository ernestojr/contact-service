const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  databaseAuthVariableOverride: {
    uid: process.env.FIREBASE_ADMIN_UID
  }
});

winston.info('Loaded firebase.')

global.firebase = admin;

module.exports = admin;
