const express = require("express");
const cors = require("cors");
const request = require('request')
const { initializeApp } = require("firebase/app");
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const config = require("./firebase.config");
const multer = require("multer");

const mongoose = require("mongoose");
require('dotenv').config();
const app = express();
var path = require('path');
var fs = require('fs');
var interceptor = require('express-interceptor')
var dir = path.join(__dirname, 'public');
var storage = path.join(__dirname, 'public/storage/');
initializeApp(config.firebaseConfig);
const fbStorage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

const MainInterceptor = interceptor(function (req, res) {
    return {
        isInterceptable: function () {
            return true
        },
        intercept: function (body, send) {
            send(body)
        },
        afterSend: (oldBody, newBody) => {
        }
    }
})

app.use(MainInterceptor);
app.use(express.static(dir));

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
app.get('/report/:file', function (req, res) {
    request(`http://localhost:9000/storage/` + req.params.file).pipe(res);
})

app.post("/upload", upload.single("filename"), async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(fbStorage, `files/${req.file.originalname + "       " + dateTime}`);

        // Create file metadata including the content type
        const metadata = {
            contentType: req.file.mimetype,
        };

        // Upload the file in the bucket storage
        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);
        //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

        // Grab the public url
        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');
        return res.send({
            message: 'file uploaded to firebase storage',
            name: req.file.originalname,
            type: req.file.mimetype,
            downloadURL: downloadURL
        })
    } catch (error) {
        return res.status(400).send(error.message)
    }
});

const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

require('./routes/doctorRoutes')(app);
require('./routes/educationRoute')(app);
require('./routes/experienceRoute')(app);
require('./routes/clinicRoute')(app);
require('./routes/fetchapiRoute')(app);
require('./routes/patientRoutes')(app);
require('./routes/patientMedicalRoutes')(app);
require('./routes/patientLifestyleRoutes')(app);
require('./routes/payment')(app);
require('./routes/helperRoute')(app);
//app.use("/", require("./controllers/doctorExperienceRoute"))

app.listen(9000, () => {
    console.log(`Server is running on port: 9000`);
})