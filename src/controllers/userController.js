const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken')
require('dotenv').config()

const loginUser = async(req, res) => {
    try{
        let data = req.body;
        const {email, password} = data

        if(Object.keys(data).length == 0) return res.status(404).send({status: false, msg: "Email and Password is required for login"})

        if(!email) return res.status(404).send({status: false, msg: "email field is empty"})
        if(!password) return res.status(404).send({status: false, msg: "password field is empty"})

        let getUserData = await userModel.findOne({email: email, password: password})

        if(getUserData){
            let token = jwt.sign({userId: getUserData._id}, process.env.SECRET_KEY, {expiresIn: '24h'})
            res.status(200).setHeader('x-api-key', token)
            res.status(200).send({status: true, msg: 'logged in', Token: token})
        }else{
            res.status(404).send({status: false, msg: "Creditials wrong!!"})
        }

    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}
  
const createUser = async (req,res) => {
    try{
        let data = req.body;
         if(!data) return res.status(400).send({status: false, msg: "Deatils are required"})

         //check duplicacy
         let uniqueEmail = await userModel.findOne({email: data.email})
         if(uniqueEmail) return res.status(404).send({status: false, msg:`This emaild id ${uniqueEmail.email} is already exist`})

         let userDetails = await userModel.create(data)
         res.status(201).send({status: true, msg:"created", data: userDetails})

    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}

const updateUser = async (req, res) => {
    try{
        let userId = req.params.id;
        if(!userId) return res.status(400).send({status: false, msg:"user id required"})
        //if(Object.keys(userId).length == 0) return res.status(404).send({status: false, msg: "userid is required"})


        let searchUser = await userModel.findOne({_id: userId})
       // console.log(searchUser)
        

        if(searchUser){
        let data = req.body;
        if(!data) return res.status(400).send({status: false, msg:"Details are required"})
        let changeDetails = await userModel.findOneAndUpdate({_id: searchUser}, data, {new: true} )
        res.status(200).send({status: true, msg:"updated", data: changeDetails})
        }else{
            return res.status(404).send({status: false, msg: `userId is not exist by this ${userId}`})
        }

    }catch(err){
        console.log(err)
        res.status(500).send({status: false, Error: err.message})
    }
}

const getUser = async (req, res) => {
    try{
        let userId = req.params.userId;
        let getData = await userModel.findById(userId)
        res.status(201).send({status: true, msg:"found your details", data: getData})

    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}


const fallowUser = async (req, res) => {
    try{
        let userId = req.body.userId;
        let paramsId = req.params.paramsId

        if(userId !== paramsId){
            const user = await userModel.findById(userId)
            const currentUser = await userModel.findById(paramsId)

            if(!user.followers.includes(userId)){
                await user.updateOne({$push: {followers: userId}})
                await currentUser.updateOne({$push: {followings: paramsId}})
                res.status(200).send({status: true, msg: "user has been followed"})
            }else{
                res.status(400).send({status: false, msg:"you already follow this user"})
            }
        }else{
            res.status(400).send({status: false, msg:"you cant fallow yourself"})
        }

    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}


const unFallowUser = async (req, res) => {
    try{
        let userId = req.body.userId;
        let paramsId = req.params.paramsId

        if(userId !== paramsId){
            const user = await userModel.findById(paramsId)
            const currentUser = await userModel.findById(userId)

            if(user.followers.includes(userId)){
                await user.updateOne({$pull: {followers: userId}})
                await currentUser.updateOne({$pull: {followings: paramsId}})
                res.status(200).send({status: true, msg: "user has been unfollowed"})
            }else{
                res.status(400).send({status: false, msg:"You do not fallow this user"})
            }
        }else{
            res.status(400).send({status: false, msg:"you can not unfallow yourself"})
        }

    }catch(err){
        res.status(500).send({status: false, Error: err.message})
    }
}



module.exports = {loginUser, createUser, updateUser, getUser, fallowUser, unFallowUser}