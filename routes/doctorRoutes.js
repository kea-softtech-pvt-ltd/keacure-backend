const express     = require('express'),
router            = express.Router();
const doctorprofileRoute = require('./controllers/doctorprofileController');
const multer         =  require('multer');
const { v4: uuidv4 } =  require('uuid');
const path           =  require("path");

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
  router.route('/loginotp').post((...params) => {doctorprofileRoute.login(...params)});
  router.route('/resendotp').post((...params) => {doctorprofileRoute.resetOTP(...params)});
  router.route('/otp').post((...params) => {doctorprofileRoute.loginOtp(...params)});
  router.route('/otpIsLoggedIn/:id').post((...params) => {doctorprofileRoute.otpIsLoggedIn(...params)});
  router.route('/fetchOtp').get((...params) => {doctorprofileRoute.fetchOtp(...params)});
  router.route('/fetchData/:id').get((...params) => {doctorprofileRoute.fetchDataById(...params)});
  router.route('/insertPersonalInfo/:id').post(upload, (...params) =>{ doctorprofileRoute.insertPersonalInfoById(...params)});
  //router.route('/doctor/:key').get((...params) => {doctorprofileRoute.fetchAllDoctor(...params)});
  router.route('/doctor/:id').get((...params) =>{ doctorprofileRoute.fetchDoctorsById(...params)});
  router.route('/auth/token').post((...params)=>doctorprofileRoute.refreshJWTToken(...params));
  //search API
  router.route('/search').post((...params)=> {doctorprofileRoute.fetchAllDoctor(...params)});
  app.use('/api', router);


}
