const mongoose = require('mongoose');

const medicine_prescription = new mongoose.Schema({
    doctorId            : { type: mongoose.Schema.Types.ObjectId },
    patientId           : { type: mongoose.Schema.Types.ObjectId },
    patientAppointmentId: { type: mongoose.Schema.Types.ObjectId },
    reportId            : { type: mongoose.Schema.Types.ObjectId },
    medicineName        : String,
    days                : String,
    weight              : String,
    timing              : String,
    frequency           : [
        {
            schedule : String
        }
    ]
}, { collection: 'medicine_Prescriptions' });

module.exports = MedicinePrescription = mongoose.model('medicine_prescription', medicine_prescription);