const express = require('express');
const router = express.Router();


const {upload, resizeImages} = require("../module/controller")
const {cloudinaryUpload} = require("../module/cloudController")
const {uploadByFirebase} = require("../module/uploadFirebase")

//aws
router.post('/create-file', resizeImages,upload)

//cloudinary
router.post("/upload-cloudinary",cloudinaryUpload)

//firebase
router.post("/upload-firebase", uploadByFirebase)

module.exports = router
