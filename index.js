const express = require("express");
const cors = require("cors");
const request = require('request')
const config = require("./firebase.config");
const mongoose = require("mongoose");
const app = express();
var path = require('path');
var dir = path.join(__dirname, 'public');
require('dotenv').config();
const { initializeApp } = require("firebase/app");
initializeApp(config.firebaseConfig);
const CsvUpload = require("express-fileupload");

app.use(express.static(dir));
app.use(CsvUpload())
app.use(cors());
app.use(express.json());

const dbUrl = "mongodb+srv://keacure_user:keacure123@keacure0.w7uhe.mongodb.net/keacure?retryWrites=true&w=majority";
mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(function () {
    console.log("connected...");
}).catch(function () {
    console.log("not connected...");
})

//required route
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.get('/report/:file', function (req, res) {
    request(`https://keacure-backend.vercel.app/storage/` + req.params.file).pipe(res);
})
app.use(express.static(path.join(__dirname,'https://keacure-backend.vercel.app/images/logo.png')));
require('./routes/doctorRoutes')(app);
require('./routes/educationRoute')(app);
require('./routes/experienceRoute')(app);
require('./routes/clinicRoute')(app);
require('./routes/fetchapiRoute')(app);
require('./routes/patientRoutes')(app);
require('./routes/patientMedicalRoutes')(app);
require('./routes/patientLifestyleRoutes')(app);
require('./routes/bookingRoutes')(app);
require('./routes/helperRoute')(app);
require('./routes/adminRout')(app);
require('./routes/subscriptionRoute')(app);
require('./routes/MedicineRoutes')(app);

app.listen(9000, () => {
    console.log(`Server is running on port: 9000`);
})