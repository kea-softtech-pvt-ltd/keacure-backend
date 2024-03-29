const express                   = require("express");
router                          = express.Router();
const MedicalReportController   = require('../controllers/MedicalReportController');

module.exports = function (app) {
  // patient medical report API
  router.route('/medicine_report').post((...params) => MedicalReportController.InsertMedicalData(...params));
  router.route('/add_investigation_note/:reportId').post((...params) => MedicalReportController.InsertInvestigationData(...params));
  router.route('/add_vital_signs/:reportId').post((...params) => MedicalReportController.InsertVitalSignsData(...params));
  router.route('/add_symptoms/:reportId').post((...params) => MedicalReportController.InsertSymptomsData(...params));
  router.route('/add_premedication_note/:reportId').post((...params) => MedicalReportController.InsertPremedicationData(...params));
  router.route('/new_follw_up_date/:reportId').post((...params) => MedicalReportController.InsertFollowUpDate(...params));
  router.route('/fetchMedicalReport/:reportId').get((...params) => MedicalReportController.fetchMedicalData(...params));
  router.route('/createPrescriptionPdf/:reportId').post((...params) => MedicalReportController.createPrescriptionPdf(...params));
  router.route('/get-pdf-prescription/:reportId').get((...params) => MedicalReportController.getPdfPrescription(...params));

  //medicine list, prescription data API
  router.route('/fetchmedicines').get((...params) => MedicalReportController.fetchmedicineData(...params));
  router.route('/add_medicinePrescription').post((...params) => MedicalReportController.InsertMedicinePrescriptionData(...params));
  router.route('/fetchmedicinePrescription/:reportId').get((...params) => MedicalReportController.fetchmedicinePrescriptionData(...params));

  //Lab Test API 
  router.route('/fetch_lab_test').get((...params) => MedicalReportController.fetchLabTestData(...params));
  router.route('/add_Labprescription').post((...params) => MedicalReportController.InsertLabPrescriptionData(...params));
  router.route('/fetch_LabTest_Prescription/:reportId').get((...params) => MedicalReportController.fetchLabTestPrescriptionData(...params));
  router.route('/download-prescription/:reportId').get((...params) => MedicalReportController.downloadPrescription(...params));
        
  //symptoms Api
  router.route('/fetchsymptoms').get((...params) => MedicalReportController.fetchSymptomsData(...params));
  router.route('/addsymptoms').post((...params) => MedicalReportController.addSymptomsData(...params));

  app.use('/api', router);
};
  