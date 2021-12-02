const mongoose = require('mongoose');

const setSession = new mongoose.Schema({
    doctorId     :  mongoose.Schema.Types.ObjectId,
    clinicId     :  mongoose.Schema.Types.ObjectId,
    fromTime     :  Date,
    toTime       :  Date,
    timeSlot     :  String,
    showSelectedSlots :  [new mongoose.Schema({
        slotId     :  mongoose.Schema.Types.ObjectId,
        slotTime   :  String,
        status     : Number
    })],
    Appointment  :  String,
    fees         :  String,
    day          :  String
},{collection: 'doctorClinics' });

module.exports = Session = mongoose.model('setSession', setSession);