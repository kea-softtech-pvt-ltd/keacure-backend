const mongoose = require('mongoose');

const setSession = new mongoose.Schema({
    doctorId: mongoose.Schema.Types.ObjectId,
    clinicId: mongoose.Schema.Types.ObjectId,
    fromTime: String,
    toTime: String,
    timeSlot: String,
    showSelectedSlots: [new mongoose.Schema({
        slotId: mongoose.Schema.Types.ObjectId,
        time: String,
        status: Boolean
    })],
    Appointment: String,
    fees: String,
    day: String,
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
}, { collection: 'doctorClinics' });

module.exports = Session = mongoose.model('setSession', setSession);