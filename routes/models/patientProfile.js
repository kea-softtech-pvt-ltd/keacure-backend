const mongoose = require('mongoose');
const config = require("../auth/config")
const { v4: uuidv4 } = require('uuid');

const patientDetails = new mongoose.Schema({
    refreshToken        :String,
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
    isLoggedIn          :Boolean,
    expiryDate          :Date
},{collection:'patientLogins'});

patientDetails.statics.createToken = function (user) {
    let expiredAt = new Date();
  
    expiredAt.setSeconds(
      expiredAt.getSeconds() + config.jwtRefreshExpiration
    );
  
    let token = uuidv4();
  
    let object = new this({
      token: token,
      patientId: user._id,
      expiryDate: expiredAt.getTime(),
    });
  
    console.log("token =======", token);
    return token;
  };
  
  patientDetails.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  }
  

module.exports = PatientLogin = mongoose.model(' patientDetails',  patientDetails);