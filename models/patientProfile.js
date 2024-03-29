const mongoose = require('mongoose');
const config = require("../auth/config")
const { v4: uuidv4 } = require('uuid');

const patientDetails = new mongoose.Schema({
    accessToken         :String,
    refreshToken        :String,
    photo               :String,
    mobile              :Number,
    MPIN                :Number,
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
    address             :String,
    isLoggedIn          :Boolean,
    expiryDate          :Date,
    parentId            :mongoose.Schema.Types.ObjectId,
    isParent            :Boolean,
    dependent           :[]
},{collection:'patients'});

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
    return token;
  };
  
  patientDetails.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
  }
  
module.exports = PatientLogin = mongoose.model('patientDetails',  patientDetails);