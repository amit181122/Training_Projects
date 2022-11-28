const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const PUBLISHABLE_KEY = "pk_test_51M6UxNSJQtJh7Coi1TTObOHOWGxOnOvfzyXOlD09Nm5IpItHSD3fxR6SC6UJrgFqr4Pc2L36GJ14o0IlnovE8URX00o0jBGWSU"
const SECRET_KEY = "sk_test_51M6UxNSJQtJh7CoiFt44zy905aI1BJu6niEYF9gwBkYwTQdvDlz2LQEj0J3gwGZ5tdssvWPMqo1gyIvIaaHhdJRh002KVhCEUu"

const stripe = require('stripe')(SECRET_KEY)

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// View Engine Setup 
app.set('views', path.join(__dirname, 'views')) 
app.set('view engine', 'ejs') 


const PORT = process.env.PORT || 3000

app.get('/', (req, res) => {
    res.render("home",{
        key: PUBLISHABLE_KEY
    })
})

app.post('/payment', (req, res) => {
    stripe.customers.create({
        email:req.body.stripeEmail,
        source: req.body.stripeToken,
        name: 'Amit Yadav',
        address:{
            line1: '23 mauntain velley new delhi',
            postal_code: '110092',
            city: 'New Delhi',
            state: 'Delhi',
            country: 'India'
        }
    })
    .then((customer) => {
        return stripe.charges.create({
            amount: 7000,
            description: 'web developement product',
            currency: 'USD',
            customer: customer.id
        })
    })
    .then((charge) => {
        console.log(charge)
        res.send("success")
    })
    .catch((err) => {
        res.send(err.message)
    })
})


app.listen(PORT, () => {
    console.log(`App is listening on ${PORT}`)
})


//mongodb://localhost:27017/online_payment
