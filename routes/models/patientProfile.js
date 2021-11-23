const mongoose = require('mongoose');

const patientDetails = new mongoose.Schema({
    photo               :String,
    mobile              :Number,
    otp                 :String,
    name                :String,
    email               :String,
    gender              :String,
    age                 :Number,
    bloodgroup          :String,
    maritalstatus       :String,
    height              :Number,
    weight              :Number,
    birthdate           :String,
    emcontact           :Number,
    address             :String,
    isLoggedIn          :Boolean

},{collection:'patientLogins'});

module.exports = PatientLogin = mongoose.model(' patientDetails',  patientDetails);