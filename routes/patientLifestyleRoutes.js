const express = require("express");
router = express.Router();
const patientLifestyleController = require('../controllers/patientLifestyleController');
const patientMedicalController  = require('../controllers/patientMedicalController');
const {isPatientLoggedIn} = require('../services/auth')

module.exports = function (app) {
    //medical 
    router.route('/patientMedicalInfo').post((...params) => patientMedicalController.allPatientMedicalData(...params));
    router.route('/updatePatientMedicalInfo/:id').post((...params) => patientMedicalController.updatePatientMedicalData(...params));
    router.route('/fetchUpdatedPatient/:id').get((...params) => patientMedicalController.fetchUpdatedPatientData(...params));
    router.route('/fetchPatientMedicalInfo/:patientId').get(
        isPatientLoggedIn,
        (...params) => patientMedicalController.getPatientMedicalData(...params));

    //lifestyle
    router.route('/insertPatientLifestyleInfo').post((...params) => patientLifestyleController.allPatientLifestyleData(...params));
    router.route('/updatePatientLifestyleInfo/:id').post((...params) => patientLifestyleController.updatePatientLifestyleData(...params));
    router.route('/fetchUpdatedPatientLifestyle/:id').get((...params) => patientLifestyleController.fetchUpdatedPatientData(...params));
    router.route('/fetchPatientLifestyleInfo/:patientId').get(
        isPatientLoggedIn,
        (...params) => patientLifestyleController.getPatientLifestyleData(...params));
        
    app.use('/api', router);
};