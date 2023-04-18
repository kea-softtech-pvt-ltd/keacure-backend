const mongoose = require('mongoose');

const medicalReport = new mongoose.Schema({
    doctorId            : { type: mongoose.Schema.Types.ObjectId },
    patientId           : { type: mongoose.Schema.Types.ObjectId },
    clinicId           : { type: mongoose.Schema.Types.ObjectId },
    patientAppointmentId: { type: mongoose.Schema.Types.ObjectId },
    investigation_note  : String,
    premedication_note  : String,
    age                 : String,
    weight              : String,
    height              : String,
    BMI                 : String,
    temp                : String,
    bp                  : String,
    pulse               : String,
    problem             : String,
    new_follow_up       : Date,
    medicine_history    : String,
    labTest_Prescriptions: [],
    medicine_Prescriptions: []
}, { collection: 'patientMedicalReports' });

module.exports = MedicalReport = mongoose.model('medicalReport', medicalReport);