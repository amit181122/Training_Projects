const {fileModel} = require("./models")
const {uploadFile} = require("../utils/aws-file-upload")
const {validateMedia} = require('../utils/validator/validate');
const sharp = require('sharp')



const upload = async function(req, res, next) {
    try{
        
         
         let file = req.files[0]
        //console.log(file)
         let data = req.body
         //console.log(data)
         //console.log(data)

         //if(!data.files) return res.status(400).send({status: false, message: "Files are required"})
         //check files is save on db is unique or not
         //let checkUniqueFiles = await fileModel.findOne({files: file.files})
         //console.log(checkUniqueFiles)
         //if(checkUniqueFiles) return res.status(400).send({status: false, message: "This Files is already uploaded"})

         if(file){
            if(!validateMedia(file))
                return res.status(400).send({msg: "Only Image file is allowed."})
                let uploadedFileURL= await uploadFile( file)
                //console.log(uploadedFileURL)
                data.images = uploadedFileURL
        }
        let saveFile = await fileModel.create(data)
        //console.log(saveFile)

        
        res.status(201).send({status: true, message: "Image Uploaded successfully", data: saveFile})

    }catch(err){
        console.log(err)
        res.status(500).send({status: false, Error: err.message})
    }

}
const resizeImages = async (req, res, next) => {
    try {
        if (!req.files) return next();
        req.body.images = [];
        req.files = await Promise.all(
            req.files.map(async file => {
                //console.log('file :>> ', file);
                if (file.originalname.endsWith('.jpg') || file.originalname.endsWith('.png') || file.originalname.endsWith('.jpeg')) {
                    const fileName = file.originalname.split('.')[0] + '.jpg';
                    const buffer = await sharp(file.buffer, { failOnError: false }).toFormat('jpeg').jpeg({ quality: 40 }).toBuffer().then(data => data);
                    const temp1 = {
                        // originalname: fileName, buffer: buffer, encoding: '7bit', mimetype: file.mimetype, fieldname: 'files', size: buffer.length
                        originalname: fileName, buffer: buffer, encoding: '7bit', mimetype: file.mimetype, fieldname: 'files', size: buffer.length
                    }
                    return temp1
                } else {
                    return file
                }
            })
        );
        next();
    } catch (error) {
        next(error)
    }
};



module.exports = {upload, resizeImages}






















// const resize = async function(req, res, next){
//     if(!req.files) return next()

//     req.body.files = [];

//     await Promise.all(
//         req,files.map(async (file) => {
//             const fileName = await uploadFile( file)
//             const newFileName = `amit-${Date.now()}-${fileName}`

//             await sharp(file.buffer)
//             .resize(640, 320)
//             .toFormat('jpeg')
//             .jpeg({quality: 90})
//             .toFile(`${newFileName}`)

//             req.body.files.push(newFileName)
//         })
//     )
//     next()
// }

// const getResultImges = async function(req, res){
//     if(req.body.files.length <= 0){
//         return res.status(400).send({status: false, msg: "You must select an one files"})
//     }

//     let uploades = await fileModel.find()
//     return res.status(201).send({status: true, msg:'This is compressed files', data: uploades})
// }

