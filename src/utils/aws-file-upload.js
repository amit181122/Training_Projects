const AWS= require("aws-sdk")
require("dotenv").config();


//set aws config
AWS.config.update({
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
    region: process.env.AWS_S3_REGION
  })
  
  // file creation in aws s3 
  let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
        let s3 = new AWS.S3();
        let uploadParams = {
            ACL: "public-read",
            Bucket: process.env.AWS_S3_BUCKET_NAME,
            Key: "Antinoproject/" + new Date().getTime() + "/" + file.originalname , //HERE
            Body: file.buffer
        };
        s3.upload(uploadParams, function (err, data) {
            if (err) {
                console.log(reject(err))
                return (reject({ "Error": err }))
  
            }
             //console.log(resolve(data))
             //console.log(data);
            console.log("File Uploaded SuccessFully");
            return resolve(data.Location)
        });
  
    });
  
  };

  module.exports.uploadFile = uploadFile

  

// const S3 = require('aws-sdk')
// require("dotenv").config();

// const bucketName = "my-bucket"
// const region = 'me-south-1'
// const accessKeyId = process.env.AWS_ACCESS_ID
// console.log(accessKeyId)
// const secretAccessKeyId = process.env.AWS_SECRET_KEY

// const s3 = new S3({
//     //apiVersion: "2010-12-01",
//     bucketName,
//     region,
//     accessKeyId,
//     secretAccessKeyId
// })

// const uploadFile = (file) => {
//     const uploadParams = {
//         Bucket: bucketName,
//         Key: "AmitTest/" + file.originalname,
//         Body: file.buffer
//     }
//     return s3.upload(uploadParams).promise()
// }

//module.exports = {uploadFile}