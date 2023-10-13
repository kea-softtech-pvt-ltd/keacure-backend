const Payment = require('../models/payment');
const PatientLogin = require('../models/patientProfile');
const clinicInfo = require('../models/clinicInfo');
const ownClinicInfo = require('../models/ownClinicInfo');
const DoctorLogin = require('../models/doctorprofile')
const Razorpay = require('razorpay');
const mongoose = require('mongoose');

module.exports = {
    // async getPaymentDetails(req, res) {
    //     var instance = new Razorpay({ key_id: 'rzp_test_9YSujFU2kXGJti', key_secret: 'NgKdgQNRgRjjzQzafHgPwYS8' })
    //     var options = {
    //         amount: 50000,  // amount in the smallest currency unit
    //         currency: "INR",
    //         receipt: "order_rcptid_11"
    //     };
    //     const ordeDetails = await instance.orders.create(options, function (err, order) {
    //         res.send({ orderId: order.id })
    //     });
    // },

    async getOrderedPaymentDetails(req, res) {
        const Data = new Payment({
            doctorId: req.body.DoctorId,
            patientId: req.body.patientId,
            clinicId: req.body.ClinicId,
            slotId: req.body.slotId,
            daySlotId: req.body.daySlotId,
           // orderId: req.body.order_id,
            transactionId: req.body.transactionId,
            dependentId: req.body.dependentId,
            fees: req.body.fees,
            date: req.body.date,
            currency: req.body.currency,
            day: req.body.day,
            timeSlot: req.body.timeSlot,
            slotTime: req.body.slotTime,
            selectedDate: req.body.selectedDate,
            startDate: req.body.startDate,
            status: req.body.status,
            medicalReportId: req.body.medicalReportId,
            payment: req.body.payment,
            paymentMethod: req.body.paymentMethod,
            total: req.body.total
        })
        await Data.save();
        if (res) {
            return res.json(Data)
        }
    },

    async fetchPaymentDataByDoctorId(req, res, next) {
        await Payment.find({ doctorId: req.params.doctorId, clinicId: req.params.clinicId }, function (err, doc) {
            res.send(doc);
        })
    },

    async getBookingDetailsBydoctorId(req, res, next) {
        const doctorId = mongoose.Types.ObjectId(req.params.doctorId);
        await Payment.aggregate([
            { "$match": { "doctorId": doctorId } },
            {
                $lookup: {
                    from: PatientLogin.collection.name,
                    localField: "patientId",
                    foreignField: "_id",
                    as: "patientDetails",
                }
            },
            {
                $lookup: {
                    from: PatientLogin.collection.name,
                    localField: "dependentId",
                    foreignField: "_id",
                    as: "dependentDetails",
                }
            },
            {
                $lookup: {
                    from: clinicInfo.collection.name,
                    localField: "clinicId",
                    foreignField: "_id",
                    as: "clinicList"
                }
            },
            {
                $lookup: {
                    from: ownClinicInfo.collection.name,
                    localField: "clinicId",
                    foreignField: "_id",
                    as: "ownClinicList"
                }
            }
        ])
            .exec((err, result) => {
                if (err) {
                    res.send(err);
                }
                if (result) {
                    const test = result.map(function (item, index) {
                        const note1 = item["timeSlot"]
                        const dateTime = item["startDate"]
                        if (item.dependentId) {
                            if (item.dependentDetails[0]) {
                                const note2 = item.dependentDetails[0]["name"]
                                result[index]["note"] = note2
                            } else {
                                null
                            }
                        } else {
                            if (item.patientDetails[0]) {
                                const note2 = item.patientDetails[0]["name"]
                                result[index]["note"] = note2
                            } else {
                                null
                            }

                        }
                        result[index]["duration"] = "00:" + note1 + ":00"
                        result[index]["start"] = dateTime + ":00"
                        result[index]["state"] ="(" + item.status + ")"
                        return item
                    })
                    res.send(test)
                }
            })
    },

    async updateStatus(req, res, next) {
        let data = {
            status: req.body.status,
            medicalReportId: req.body.medicalReportId,
            payment: req.body.payment,
            paymentMethod: req.body.paymentMethod,
            total: req.body.total
        }
        await Payment.findByIdAndUpdate({ _id: req.params.patientAppointmentId }, data, function (err, data) {
            if (err) {
                res.json(err);

            }
            else {
                res.json(data);
            }
        });
    },

    async getBookingDetailsByPatientId(req, res, next) {
        const patientId = mongoose.Types.ObjectId(req.params.patientId);
        await Payment.aggregate([
            { "$match": { "patientId": patientId } },

            {
                $lookup: {
                    from: DoctorLogin.collection.name,
                    localField: "doctorId",
                    foreignField: "_id",
                    as: "doctorDetails",
                }
            },
        ])
            .exec((err, result) => {
                if (err) {
                    res.send(err);
                }
                if (result) {
                    const test = result.map(function (item, index) {
                        const note1 = item["timeSlot"]
                        const dateTime = item["startDate"]
                        const note2 = item.doctorDetails[0]["name"]
                        result[index]["note"] = "Dr." + note2
                        result[index]["duration"] = "00:" + note1 + ":00"
                        result[index]["start"] = dateTime + ":00"
                        result[index]["state"] ="(" + item.status + ")"
                        return item
                    })
                    res.send(test)
                }
            })
    },

    async cancelAppointment(req, res) {
        await Payment.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: new Date(), status: "Cancelled" });
        res.status(200).json('user Deleted');
    },
}