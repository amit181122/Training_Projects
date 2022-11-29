const express = require('express')
const bodyParser = require('body-parser');
const route = require('./src/routes/route.js')
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 3030
const dbUrl = process.env.MONGODB;



//middleware bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// //Database connecting
mongoose.connect(dbUrl, {useNewUrlParser: true})
.then(() => console.log("Database is connected..."))
.catch(err => console.log(err))

app.use('/', route)  



//connecting to port 
app.listen(port, function (){
    console.log("server running on port " + (port))
})
