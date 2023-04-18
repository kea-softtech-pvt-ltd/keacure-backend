const express  = require("express");
const cors     = require("cors");
const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
var path = require('path');
var fs = require('fs');

var dir = path.join(__dirname, 'public');


app.use(express.static(dir));

app.use(cors());
app.use(express.json());

const dbUrl = "mongodb+srv://keacure_user:keacure123@keacure0.w7uhe.mongodb.net/keacure?retryWrites=true&w=majority";
mongoose.connect(dbUrl ,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(function(){
    console.log("connected...");
}).catch(function(){
    console.log("not connected...");
})

//required route
app.use(cors());
require('./routes/doctorRoutes')(app);
require('./routes/educationRoute')(app);
require('./routes/experienceRoute')(app);
require('./routes/clinicRoute')(app);
require('./routes/fetchapiRoute')(app);
require('./routes/patientRoutes')(app);
require('./routes/patientMedicalRoutes')(app);
require('./routes/patientLifestyleRoutes')(app);
require('./routes/payment')(app);
//app.use("/", require("./controllers/doctorExperienceRoute"))

app.listen(9000, () => {
    console.log(`Server is running on port: 9000`);
})