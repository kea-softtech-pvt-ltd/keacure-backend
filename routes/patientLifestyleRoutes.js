const express = require("express");
router = express.Router();
const patientLifestyleController = require('./controllers/patientLifestyleController');
const patientMedicalController  = require('./controllers/patientMedicalController');

module.exports = function (app) {
    //medical 
    router.route('/patientMedicalInfo').post((...params) => patientMedicalController.allPatientMedicalData(...params));
    router.route('/fetchPatientMedicalInfo/:id').get((...params) => patientMedicalController.getPatientMedicalData(...params));
    router.route('/updatePatientMedicalInfo/:id').post((...params) => patientMedicalController.updatePatientMedicalData(...params));
    router.route('/fetchUpdatedPatient/:id').get((...params) => patientMedicalController.fetchUpdatedPatientData(...params));

    //lifestyle
    router.route('/insertPatientLifestyleInfo').post((...params) => patientLifestyleController.allPatientLifestyleData(...params));
    router.route('/fetchPatientLifestyleInfo/:id').get((...params) => patientLifestyleController.getPatientLifestyleData(...params));
    router.route('/updatePatientLifestyleInfo/:id').post((...params) => patientLifestyleController.updatePatientLifestyleData(...params));
    router.route('/fetchUpdatedPatientLifestyle/:id').get((...params) => patientLifestyleController.fetchUpdatedPatientData(...params));
    app.use('/api', router);
};