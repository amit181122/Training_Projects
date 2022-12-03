const express = require('express');

const {admin} = require('./src/firebase-config')

const port = process.env.PORT || 3001;
require("dotenv").config();

const app = express();

const token = process.env.TOKEN

const payload = {
    notification: {
        title: "This is a notification",
        body: "This is the body of the notification"
    }
}

const options = {
    priority: "high",
    timeToLive: 60*60*24
}

admin.messaging().sendToDevice(token, payload, options)
.then(function(response){
    console.log("successfully sent message:",JSON.stringify( response))
})
.catch(function(error){
    console.log("Error sending message:", error)
})

//server connecting
app.listen(port, () => {
    console.log('listening on port ', port);
})