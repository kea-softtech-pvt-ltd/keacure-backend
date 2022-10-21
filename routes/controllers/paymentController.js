const Payment = require('../models/payment')
const Razorpay = require('razorpay');

module.exports = {
    async getPaymentDetails(req, res) {
        var instance = new Razorpay({ key_id: 'rzp_test_9YSujFU2kXGJti', key_secret: 'NgKdgQNRgRjjzQzafHgPwYS8' })
        var options = {
            amount: 50000,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const ordeDetails = await instance.orders.create(options, function(err, order) {
            //console.log("order========>", order);
            res.send({orderId : order.id})
        });
    },

    async getOrderedPaymentDetails(req, res){
        const Data = new Payment({
            doctorId          : req.body.DoctorId,
            patientId         : req.body.patientId,
            clinicId          : req.body.ClinicId,
            slotId            : req.body.slotId,
            daySlotId         : req.body.daySlotId,
            orderId           : req.body.order_id,
            transactionId     : req.body.transactionId,
            fees              : req.body.fees,
            date              : req.body.date,
            currency          : req.body.currency,
            day               : req.body.day
        })
        console.log("data=======", Data)
        await Data.save();
        if(res) {
            return res.json(Data)
        }
    },

    async fetchDataById(req, res) { 
        await Payment.findById(req.params.id, function (err, doc) {
          res.send(doc);
        })
    },

    async getDaySlots(req ,res , next){       
        await Payment.find({doctorId: req.params.doctorId, clinicId: req.params.clinicId, daySlotId: req.params.daySlotId}, function (err, doc) {
            res.send(doc);
        })
    },
}