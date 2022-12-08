const mongoose = require('mongoose')

const uploadSchema = new mongoose.Schema({
    images: {
        type: String,
        //unique: true,
        //required: true,
        trim: true
    }
},
{timestamps:true})

const fileModel = mongoose.model('Upload', uploadSchema)

module.exports = {fileModel}