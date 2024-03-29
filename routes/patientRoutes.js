const express     = require('express'),
router            = express.Router();
const patientProfileController = require('../controllers/patientProfileController');
const multer         =  require('multer');
const { v4: uuidv4 } =  require('uuid');
const path           =  require("path");
const {isPatientLoggedIn} = require('../services/auth')
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null,'../keacure-webapp/public/patientImages');
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
  //for patient personal details
  router.route('/fetchPatientDetails').get((...params) => {patientProfileController.fetchAllPatient(...params)});
  router.route('/patientLogin').post((...params) => {patientProfileController.PatientLogin(...params)});
  router.route('/resendOtp/:id').post((...params) => {patientProfileController.resetOTP(...params)});
  router.route('/patientLoginOtp').post((...params) => {patientProfileController.getPatientOtp(...params)});
  router.route('/patientOtpIsLoggedIn/:patientId').post((...params) => {patientProfileController.otpIsLoggedIn(...params)});
  router.route('/insertPatientDetails/:patientId').post(
    upload ,
    isPatientLoggedIn,
    (...params) => {patientProfileController.insertPatientDetails(...params)});
  router.route('/patient').post((...params) => {patientProfileController.allPatient(...params)});
  router.route('/patientById/:patientId').get((...params)=>patientProfileController.fetchPatientById(...params));
  router.route('/auth/refreshToken').post((...params)=>patientProfileController.refreshJWTToken(...params));
  router.route('/adddependent/:patientId').post(
    upload ,
    isPatientLoggedIn,
    (...params)=>patientProfileController.addDependent(...params));
  app.use('/api', router);
};
