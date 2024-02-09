const mongoose = require('mongoose');

const medicine_prescription = new mongoose.Schema({
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