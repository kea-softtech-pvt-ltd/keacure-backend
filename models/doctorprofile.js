const mongoose = require('mongoose');
const config = require("../auth/config")
const { v4: uuidv4 } = require('uuid');

const doctorDetail = new mongoose.Schema({
  accessToken         :String,
  refreshToken        :String,
  isLoggedIn          :Boolean,
  isSubscribed        :Boolean,
  mobile              :Number,
  otp                 :String,
  photo               :String,
  name                :String,
  gender              :String,
  address             :String,
  officialEmail       :String,
  personalEmail       :String,
  medicines_ID        :String,
  education:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'doctorEducations'
  },
  clinics : []
},{collection: 'doctordetails' });

doctorDetail.statics.createToken = function (user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(
    expiredAt.getSeconds() + config.jwtRefreshExpiration
  );

  let token = uuidv4();

  let object = new this({
    token: token,
    doctorId: user._id,
    expiryDate: expiredAt.getTime(),
  });

  return token;
};
  
doctorDetail.statics.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime();
}

module.exports = DoctorLogin = mongoose.model('doctorDetail', doctorDetail);