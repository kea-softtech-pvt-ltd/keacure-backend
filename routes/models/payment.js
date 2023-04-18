const mongoose = require('mongoose');

const payment = new mongoose.Schema({
    doctorId      : { type: mongoose.Schema.Types.ObjectId },
    patientId     : { type: mongoose.Schema.Types.ObjectId },
    clinicId      : { type: mongoose.Schema.Types.ObjectId },
    slotId        : { type: mongoose.Schema.Types.ObjectId },
    daySlotId     : { type: mongoose.Schema.Types.ObjectId },
    medicalReportId: { type: mongoose.Schema.Types.ObjectId },
    orderId       : String,
    transactionId : String,
    Appointment   : String,
    fees          : Number,
    currency      : String,
    date          : String,
    day           : String,
    slotTime      : String,
    timeSlot      : String,
    selectedDate  : Date,
    startDate     : String,
    status        : String
    // status: {
    //     type: String,
    //     enum : ['Ongoing','Completed'] ,
    //     default: 'Ongoing'
    // } 
},{collection: 'BookingDetails' });

module.exports = Payment = mongoose.model('payment', payment);