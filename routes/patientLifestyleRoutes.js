const express = require("express");
router        = express.Router();
const patientLifestyleController = require('./controllers/patientLifestyleController');

module.exports = function (app) {
    router.route('/insertPatientLifestyleInfo').post((...params)=>patientLifestyleController.allPatientLifestyleData(...params));
    router.route('/fetchPatientLifestyleInfo/:id').get((...params)=>patientLifestyleController.getPatientLifestyleData(...params));
    router.route('/updatePatientLifestyleInfo/:id').post((...params)=>patientLifestyleController.updatePatientLifestyleData(...params));
    router.route('/fetchUpdatedPatientLifestyle/:id').get((...params)=>patientLifestyleController.fetchUpdatedPatientData(...params));
    app.use('/api', router);
};
  