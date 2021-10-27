const mongoose = require('mongoose');

const patientDetails = new mongoose.Schema({
    mobile              :Number,
    otp                 :String,
    name                :String,
    lName               :String,
    email               :String,
    gender              :String,
    age                 :Number,
    isLoggedIn          :Boolean

},{collection:'patientLogins'});

module.exports = PatientLogin = mongoose.model(' patientDetails',  patientDetails);