require("module-alias/register")
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const logs = require('./src/utils/logger/logs')
const logger = require('./src/utils/logger');
const client = require('./src/utils/redisConnection')
const bodyParser = require('body-parser');
const fixResponse = require('./src/utils/responseBody');
const path = require('path')
const route = require('./src/route/routes')
const fileUpload = require('express-fileupload')




// const {
//   limitConstructor
// } = require("@middleware/customLimiter");
// const {
//   errorList
// } = require("@components/language/language.controller");
const moment = require("moment");


const {
  PORT,
  ORIGIN,
  UPLOADED_FILE_SIZE
} = require('./config');


//db connection
require('./databse/mongoose');
client.connect()
client.on('connect', () => {
  console.log("redis connect")

})

// routes

// init express app
// file deepcode ignore UseCsurfForExpress: <please specify a reason of ignoring this>
const app = express();
const helmet = require("helmet");
const compression = require("compression");
const morgan = require("morgan");
// const multer= require("multer");
// app.use( multer().any())

//templePath
app.use(fileUpload({
  useTempFiles: true
}))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
// middlewares




// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Methods", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, X-Callback-Type, Content-Type, Accept"
//   );
//   res.header("Cache-Control", "no-cache");
//   if ("OPTIONS" == req.method) {
//     res.send(200);
//   } else {
//     next();
//   }
// });
//app.use(express.json());
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));

// // set the view engine to ejs
// app.set('view engine', 'ejs');
// const static_path = path.join(__dirname, "./public");
// app.use(express.static(static_path));

// // use res.render to load up an ejs view file

// // index page
// app.get('/', function (req, res) {
//   res.render('pages/index');
// });

// // about page
// app.get('/privacy_fitbasix', function (req, res) {
//   res.render('pages/privacy_fitbasix');
// });
// app.get('/terms', function (req, res) {
//   res.render('pages/terms');
// });
// app.get('/refund_cancellation_policy', function (req, res) {
//   res.render('pages/refund_policy')
// })
// app.get('/about_us', function (req, res) {
//   res.render('pages/about_us')
// })
// app.get('/getCallBack', function (req, res) {
//   res.render('pages/getcall')
// })
// //app.use(logs())
// app.use(helmet());
// app.use(compression());

//const limiter = limitConstructor(process.env.GLOBAL_LIMIT_PER_MINUTE, moment.duration(1, "minute").asMilliseconds(), "Too many requests from this IP, please try again later");

// app.use("*", fixResponse)
// app.use("*", limiter)
// app.use(fixResponse)


app.use('/', route)  

// app.use("/api/auth", authRoutes);
// app.use("/api/country", countryRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/trainer", trainerRoutes);
// app.use("/api/feedback", feedbackRoutes);
// app.use("/api/certificate", certificateRoutes);
// app.use("/api/plan", plansRoutes);
// app.use("/api/interests", interestRoutes);
// app.use('/api/trainertype', trainerTypeRoutes)
// app.use('/api/posts', postRoutes);
// app.use('/api/comment', commentRoute);
// app.use('/api/like', likeRoute);
// app.use('/api/follow', followRoute);
// app.use('/api/category', categoryRoute);
// app.use('/api/goal', goalRoute);
// app.use('/api/nutrition', waterNutritionRoute);
// app.use('/api/chat', chatRoute);
// app.use('/api/schedule', scheduleRoute);
// app.use('/api/nutritions', nutritionRoute);
// app.use('/api/documents', documentRoute)
// app.use('/api/optionData/sorting', optionDataRoute.sortingRoute);
// app.use('/api/optionData/timeSlots', optionDataRoute.timeSlotsRoute);
// app.use('/api/optionData/days', optionDataRoute.daysRoute)
// app.use('/api/trainerLogin', trainerLoginRoute);
// app.use('/api/notification', pushNotificationRoute);
// app.use('/api/rating', trainerRatingRoute);
// app.use('/api/review', trainerReviewRoute);
// app.use('/api/report', reportRoute);
// app.use('/api/optionData/reportReasonList', optionDataRoute.reportReasonRoute);
// app.use('/api/admin', adminRoute)
// app.use("/api/language", languageRoute)
// app.use('/api/videoChat', videoChatRoute)
// app.use('/api/sessionsComplete', sessionCompleteRoute)
// app.use('/api/payment', paymentRoute)
// app.use('/api/enrollPLan', enrollPlanRoute)
// app.use('/api/getCall', getCallRoute)
// app.use('/api/subscription', subscriptionRoute)
// app.use('/api/discount', discountCouponRoute)
// app.use('/api/sessionReview', sessionReviewRoute)
// app.use('/api/couponTrainer', couponTrainerRoute)



// app.use("*", (req, res, next) => {

//   const error = {
//     status: 404,
//     message: "API_ENDPOINT_NOT_FOUND_ERR",
//   };
//   next(error);
// });
// app.use(async (err, req, res, next) => {
//   const ErrorArray = await errorList();
//   console.log('err :>> ', err);
//   err = JSON.parse(JSON.stringify(err))
//   if (err.name === "MulterError") {
//     err.message = err.code === 'LIMIT_UNEXPECTED_FILE' ? 'Limit Too Many Files' : err.code
//   }
//   if (err.name === "MulterError") {
//     err.message = err.code === 'LIMIT_FILE_SIZE' ? `File Size Is Too Big Only Accept Maximum ${UPLOADED_FILE_SIZE} MB Of Video And ${UPLOADED_FILE_SIZE / 4} MB Of Image` : err.code
//   }
//   if (err == RESPONSE_STRINGS.LOGIN_AGAIN || err == RESPONSE_STRINGS.INVALID_TOKEN) {
//     return res.status(444).json({
//       resCode: 1,
//       message: err
//     })
//   }
//   if (err == RESPONSE_STRINGS.EXIST_PHONE) {
//     return res.status(409).json({
//       resCode: 1,
//       message: err
//     })
//   }
//   if (err == RESPONSE_STRINGS.INCORRECT_OTP) {
//     return res.status(406).json({
//       resCode: 1,
//       message: err
//     })
//   }
//   if (err == RESPONSE_STRINGS.UNAUTHORIZED) {
//     return res.status(401).json({
//       resCode: 1,
//       message: err
//     })
//   }
//   if (err == RESPONSE_STRINGS.UNAUTHORIZED_CREATE) {
//     return res.status(446).json({
//       resCode: 1,
//       message: err
//     })
//   }
//   if (err == RESPONSE_STRINGS.IsBlacklisted
//     || err == RESPONSE_STRINGS.IsDeleted
//     || err == RESPONSE_STRINGS.IsNotActive) {
//     return res.status(445).json({
//       resCode: 1,
//       message: err
//     })
//   }
//   if (err == RESPONSE_STRINGS.UNAUTHENTICATED || err == RESPONSE_STRINGS.TOKEN_MISSING) {
//     return res.status(403).json({
//       resCode: 1,
//       message: err
//     })
//   }

//   const tempError = err.message != undefined ? err.message.split(': ', 3)[2] ? (err.message.split(': ', 3)[2]).split(',')[0] : err : err;
//   if (tempError == RESPONSE_STRINGS.DEVICE_LIMIT_EXCEEDED) {
//     return res.status(405).json({
//       resCode: 1,
//       message: RESPONSE_STRINGS.DEVICE_LIMIT_EXCEEDED
//     })
//   }
//   if (tempError == RESPONSE_STRINGS.INVALID_EMAIL)

//     return res.status(err.status || 500).json({
//       resCode: 1,
//       message: RESPONSE_STRINGS.INVALID_EMAIL
//     })
//   if (tempError == RESPONSE_STRINGS.INCORRECT_PHONE)

//     return res.status(err.status || 500).json({
//       resCode: 1,
//       message: RESPONSE_STRINGS.INCORRECT_PHONE
//     })
//   if (tempError == RESPONSE_STRINGS.INVALID_NAME)

//     return res.status(err.status || 500).json({
//       resCode: 1,
//       message: RESPONSE_STRINGS.INVALID_NAME
//     })


//   if (ErrorArray.includes(err)) {
//     return res.status(err.status || 500).json({
//       resCode: 1,
//       message: err

//     })
//   }
//   return res.status(err.status || 500).json({
//     resCode: 1,
//     msg: err.message,
//     message: RESPONSE_STRINGS.FAILED

//   })
// })

// app.use(express.json({
//   extended: false,
//   limit: '50mb'
// }))



app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))