const {fileModel} = require("./models")
const cloudinary = require('cloudinary').v2;
const sharp = require('sharp')
require("dotenv").config();

//cloudinary configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true
  });

  const cloudinaryUpload = async function(req, res){
    try{
        const file = req.files.images;
        cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
            console.log(result)
            let data = req.body;
            data.images = result.url
            let uploadCloudinary = fileModel.create(data)
            console.log(uploadCloudinary)

       res.status(201).send({status: true, message: "Image Uploaded successfully", data: uploadCloudinary})

        })    
       
   }catch(err){
       res.status(500).send({status: false, Error: err.message})
   }
  }


//   const resizeclImages = async (req, res, next) => {
//     try {
//         if (!req.files) return next();
//         req.body.images = [];
//         req.files = await Promise.all(
//             req.files.map(async file => {
//                 //console.log('file :>> ', file);
//                 if (file.originalname.endsWith('.jpg') || file.originalname.endsWith('.png') || file.originalname.endsWith('.jpeg')) {
//                     const fileName = file.originalname.split('.')[0] + '.jpg';
//                     const buffer = await sharp(file.buffer, { failOnError: false }).toFormat('jpeg').jpeg({ quality: 40 }).toBuffer().then(data => data);
//                     const temp1 = {
//                         // originalname: fileName, buffer: buffer, encoding: '7bit', mimetype: file.mimetype, fieldname: 'files', size: buffer.length
//                         originalname: fileName, buffer: buffer, encoding: '7bit', mimetype: file.mimetype, fieldname: 'files', size: buffer.length
//                     }
//                     return temp1
//                 } else {
//                     return file
//                 }
//             })
//         );
//         next();
//     } catch (error) {
//         next(error)
//     }
// };


module.exports = {cloudinaryUpload}


