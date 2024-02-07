const express     = require('express'),
router            = express.Router();
const doctorprofileController = require('./controllers/doctorprofileController');
const multer         =  require('multer');
const { v4: uuidv4 } =  require('uuid');
const path           =  require("path");
const { isSubscribed, isDrLoggedIn } = require("../services/auth")

// const {isLoggedIn} = require('../services/auth')
//update data cb=callback
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null,'../keacure-webapp/public/images');
  },
  filename: function(req, file, cb) {   
    cb(null, uuidv4()+ '-' + Date.now()  + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpg','image/jpeg', 'image/png', 'application/vnd.ms-excel' ,'application/pdf']
  if(allowedFileTypes.includes(file.mimetype)) {
      return cb(null, true);
  } else {
      return cb(null, false);
  }
}

let upload = multer({ storage: storage, fileFilter:fileFilter}).single('photo');

module.exports = function (app) {
  router.route('/loginotp').post((...params) => {doctorprofileController.login(...params)});
  router.route('/resendotp').post((...params) => {doctorprofileController.resetOTP(...params)});
  router.route('/otp').post((...params) => {doctorprofileController.loginOtp(...params)});
  router.route('/fetchOtp').get((...params) => {doctorprofileController.fetchOtp(...params)});
  router.route('/fetchData/:doctorId').get(
    isDrLoggedIn,
    isSubscribed,
    (...params) => {doctorprofileController.fetchDataById(...params)});
  router.route('/insertPersonalInfo/:doctorId').post(
    upload, 
    isDrLoggedIn,
    isSubscribed,
    (...params) =>{ doctorprofileController.insertPersonalInfoById(...params)});
  router.route('/doctor/:doctorId').get(
    isDrLoggedIn,
    isSubscribed,
    (...params) =>{ doctorprofileController.fetchDoctorsById(...params)});
  router.route('/auth/token').post((...params)=>doctorprofileController.refreshJWTToken(...params));
  //search API
  router.route('/search').post((...params)=> {doctorprofileController.fetchAllDoctor(...params)});
  app.use('/api', router);
}