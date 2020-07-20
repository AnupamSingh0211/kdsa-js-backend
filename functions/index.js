const functions = require('firebase-functions');

// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions

// The Firebase Admin SDK to access Cloud Firestore.
const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();

exports.welcomeToKDSA = functions.https.onCall((data, context) => {
  functions.logger.info("Hello logs!", { onCall: true});
  return {message : "welcome to kdsa"};
});


// / Take the text parameter passed to this HTTP endpoint and insert it into 
// // Cloud Firestore under the path /messages/:documentId/original
exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Cloud Firestore using the Firebase Admin SDK.
  const writeResult = await admin.firestore().collection('messages').add({original: original});
  // Send back a message that we've succesfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

exports.getDataStructures = functions.https.onRequest((req, res) => {
  const docRef = db.collection('DataStructures').doc('YLQxBam1F8soF8dvgyPO');
  const getDoc = docRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
        return res.send('Not Found')
      } 
        console.log(doc.data());
        return res.send({data : doc.data()});
    })
    .catch(err => {
      console.log('Error getting document', err);
    });
 });

 

 



 