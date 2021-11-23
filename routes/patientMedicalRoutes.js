const express = require("express");
router        = express.Router();
const patientMedicalController = require('./controllers/patientMedicalController');

module.exports = function (app) {
    router.route('/patientMedicalInfo').post((...params)=>patientMedicalController.allPatientMedicalData(...params));
    router.route('/fetchPatientMedicalInfo/:id').get((...params)=>patientMedicalController.getPatientMedicalData(...params));
    router.route('/updatePatientMedicalInfo/:id').post((...params)=>patientMedicalController.updatePatientMedicalData(...params));
    router.route('/fetchUpdatedPatient/:id').get((...params)=>patientMedicalController.fetchUpdatedPatientData(...params));
    app.use('/api', router);
  };
  