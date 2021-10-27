const mongoose = require('mongoose');

const doctorDetail = new mongoose.Schema({
    isLoggedIn          :Boolean,
    mobile              :Number,
    otp                 :String,
    photo               :String,
    name                :String,
    gender              :String,
    address             :String,
    officialEmail       :String,
    personalEmail       :String,
},{collection: 'doctordetails' });
module.exports = DoctorDetail = mongoose.model('doctorDetail', doctorDetail);