const admin = require("firebase-admin");

var serviceAccount = require("../serviceAcount.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "mongodb+srv://socialmediaApp:cLbUfhv1ooGleu8k@cluster0.qlkckah.mongodb.net/firebase-DB"
  });

module.exports = {admin}