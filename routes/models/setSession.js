const mongoose = require('mongoose');

const setSession = new mongoose.Schema({
    doctorId     :  mongoose.Schema.Types.ObjectId,
    clinicId     :  mongoose.Schema.Types.ObjectId,
    fromTime     :  String,
    toTime       :  String,
    timeSlot     :  String,
    showSelectedSlots :  [new mongoose.Schema({
        slotId     :  mongoose.Schema.Types.ObjectId,
        time       :  String,
        status     : Number
    })],
    Appointment  :  String,
    fees         :  String,
    day          :  String
},{collection: 'doctorClinics' });

module.exports = Session = mongoose.model('setSession', setSession);