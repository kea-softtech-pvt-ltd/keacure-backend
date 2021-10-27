const express     = require('express'),
router            = express.Router();
const patientProfileController = require('./controllers/patientProfileController');

module.exports = function (app) {
  router.route('/fetchPatientDetails').get((...params) => {patientProfileController.fetchAllPatient(...params)});
  router.route('/patientLogin').post((...params) => {patientProfileController.PatientLogin(...params)});
  router.route('/patientLoginOtp').post((...params) => {patientProfileController.getPatientOtp(...params)});
  router.route('/patientOtpIsLoggedIn/:id').post((...params) => {patientProfileController.otpIsLoggedIn(...params)});
  router.route('/insertPatientDetails/:id').post((...params) => {patientProfileController.insertPatientDetails(...params)});
  router.route('/patient').post((...params) => {patientProfileController.allPatient(...params)});
  router.route('/patientById/:id').get((...params)=>patientProfileController.fetchPatientById(...params));
  app.use('/api', router);
};