//const {fileModel} = require("./models")
const user = require("../../config")

// const uploadByFirebase = async function(req, res){
//     try{
//         const data = req.body
//         const uploadImage = await fileModel.create(data)
//         res.status(201).send({status: true, msg: "Image uploaded on firebase", data: uploadImage})
//     }catch(err){
//         res.status(500).send({status: false, Error: err.message})
//     }
// }


// module.exports = {uploadByFirebase}


const uploadByFirebase = async function(req, res){
    try{
        const data = req.body;
        console.log(data)
        const firebaseData = await user.create(data)
        res.status(201).send({status: true, msg: "Image uploaded on firebase", data: firebaseData})

    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}


module.exports = {uploadByFirebase}





// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyA6vSVITx9Rx51m6IXB-VcKNnO_JVVnrSw",
//   authDomain: "image-uploading-8409d.firebaseapp.com",
//   projectId: "image-uploading-8409d",
//   storageBucket: "image-uploading-8409d.appspot.com",
//   messagingSenderId: "590564128696",
//   appId: "1:590564128696:web:ce3877c22e10e05bb8014d",
//   measurementId: "G-045M5KFN7L"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

//npm install -g firebase-tools

//firebase login
//firebase init
//firebase deploy



// const express = require('express');
// const app = express();
// const googleStorage = require('@google-cloud/storage');
// const Multer = require('multer');

// const storage = googleStorage({
//   projectId: "<Firebase Project ID",
//   keyFilename: "<path to service accounts prviate key JSON>"
// });

// const bucket = storage.bucket("<Firebase Storage Bucket URL");

// const multer = Multer({
//   storage: Multer.memoryStorage(),
//   limits: {
//     fileSize: 5 * 1024 * 1024 // no larger than 5mb, you can change as needed.
//   }
// });

// app.listen(3000, () => {
//   console.log('App listening to port 3000');
// });

// /**
//  * Adding new file to the storage
//  */
// app.post('/upload', multer.single('file'), (req, res) => {
//   console.log('Upload Image');

//   let file = req.file;
//   if (file) {
//     uploadImageToStorage(file).then((success) => {
//       res.status(200).send({
//         status: 'success'
//       });
//     }).catch((error) => {
//       console.error(error);
//     });
//   }
// });

// /**
//  * Upload the image file to Google Storage
//  * @param {File} file object that will be uploaded to Google Storage
//  */
// const uploadImageToStorage = (file) => {
//   return new Promise((resolve, reject) => {
//     if (!file) {
//       reject('No image file');
//     }
//     let newFileName = `${file.originalname}_${Date.now()}`;

//     let fileUpload = bucket.file(newFileName);

//     const blobStream = fileUpload.createWriteStream({
//       metadata: {
//         contentType: file.mimetype
//       }
//     });

//     blobStream.on('error', (error) => {
//       reject('Something is wrong! Unable to upload at the moment.');
//     });

//     blobStream.on('finish', () => {
//       // The public URL can be used to directly access the file via HTTP.
//       const url = format(`https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`);
//       resolve(url);
//     });

//     blobStream.end(file.buffer);
//   });
// }