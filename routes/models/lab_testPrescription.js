const mongoose = require('mongoose');

const lab_Prescription = new mongoose.Schema({
    doctorId            : { type: mongoose.Schema.Types.ObjectId },
    patientId           : { type: mongoose.Schema.Types.ObjectId },
    reportId            : { type: mongoose.Schema.Types.ObjectId },
    patientAppointmentId: { type: mongoose.Schema.Types.ObjectId },
    test_name           : String,
    category            : String,
    test_method         : String,
    specimen_type       : String,
    about_test          : String
}, { collection: 'lab_Prescriptions' });

module.exports = LabPrescription = mongoose.model('lab_Prescription', lab_Prescription);