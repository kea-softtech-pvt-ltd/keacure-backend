const express                   = require("express");
router                          = express.Router();
const patientMedicalController  = require('./controllers/patientMedicalController');
const MedicalReportController   = require('./controllers/MedicalReportController')

module.exports = function (app) {
  //for patient App
  router.route('/patientMedicalInfo').post((...params) => patientMedicalController.allPatientMedicalData(...params));
  router.route('/fetchPatientMedicalInfo/:id').get((...params) => patientMedicalController.getPatientMedicalData(...params));
  router.route('/updatePatientMedicalInfo/:id').post((...params) => patientMedicalController.updatePatientMedicalData(...params));
  router.route('/fetchUpdatedPatient/:id').get((...params) => patientMedicalController.fetchUpdatedPatientData(...params));

  //for doctor App
  // patient medical report API
  router.route('/medicine_report').post((...params) => MedicalReportController.InsertMedicalData(...params));
  router.route('/add_investigation_note/:reportId').post((...params) => MedicalReportController.InsertInvestigationData(...params));
  router.route('/add_vital_signs/:reportId').post((...params) => MedicalReportController.InsertVitalSignsData(...params));
  router.route('/add_premedication_note/:reportId').post((...params) => MedicalReportController.InsertPremedicationData(...params));
  router.route('/new_follw_up_date/:reportId').post((...params) => MedicalReportController.InsertFollowUpDate(...params));
  router.route('/fetchMedicalReport/:patientAppointmentId/:doctorId/:patientId').get((...params) => MedicalReportController.fetchMedicalData(...params));

  //medicine list, prescription data API
  router.route('/fetchmedicines').get((...params) => MedicalReportController.fetchmedicineData(...params));
  router.route('/add_medicinePrescription').post((...params) => MedicalReportController.InsertMedicinePrescriptionData(...params));
  router.route('/fetchmedicinePrescription/:patientAppointmentId/:doctorId/:patientId').get((...params) => MedicalReportController.fetchmedicinePrescriptionData(...params));

  //Lab Test API 
  router.route('/fetch_lab_test').get((...params) => MedicalReportController.fetchLabTestData(...params));
  router.route('/add_Labprescription').post((...params) => MedicalReportController.InsertLabPrescriptionData(...params));
  router.route('/fetch_LabTest_Prescription/:patientAppointmentId/:doctorId/:patientId').get((...params) => MedicalReportController.fetchLabTestPrescriptionData(...params));
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        
  app.use('/api', router);
};
  