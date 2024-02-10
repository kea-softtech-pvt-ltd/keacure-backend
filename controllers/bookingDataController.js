const Payment = require('../models/bookingModule');
const PatientLogin = require('../models/patientProfile');
const Clinics = require('../models/clinic');
const DoctorLogin = require('../models/doctorprofile')
const Razorpay = require('razorpay');
const mongoose = require('mongoose');

module.exports = {
    async getPaymentDetails(req, res) {
        var instance = new Razorpay({ key_id: 'rzp_test_9YSujFU2kXGJti', key_secret: 'NgKdgQNRgRjjzQzafHgPwYS8' })
        var options = {
            amount: 50000,  // amount in the smallest currency unit
            currency: "INR",
            receipt: "order_rcptid_11"
        };
        const ordeDetails = await instance.orders.create(options, function (err, order) {
            res.send({ orderId: order.id })
        });
    },

    async getOrderedPaymentDetails(req, res) {
        const Data = new Payment({
            doctorId: req.body.DoctorId,
            patientId: req.body.patientId,
            clinicId: req.body.ClinicId,
            slotId: req.body.slotId,
            daySlotId: req.body.daySlotId,
            transactionId: req.body.transactionId,
            dependentId: req.body.dependentId,
            isdependent: req.body.isdependent,
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
        console.log("Data=======", Data)
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

    async getAppointment(req, res, next) {
        await Payment.find({ _id: req.params.id }, function (err, doc) {
            res.send(doc);
        })
    },

    async getBookingDetailsBydoctorId(req, res, next) {
        const doctorId = mongoose.Types.ObjectId(req.params.doctorId);
        const page = req.query.page || 1;
        const pageSize = parseInt(req.query.pageSize || 6);
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
                    from: Clinics.collection.name,
                    localField: "clinicId",
                    foreignField: "_id",
                    as: "clinicList"
                }
            }
        ])
            .exec((err, result) => {
                if (err) {
                    res.send(err);
                }

                if (result) {
                    const sortedData = result.sort((data1, data2) => (data1.selectedDate) - (data2.selectedDate))
                    const test = sortedData.map(function (item, index) {
                        const note1 = item["timeSlot"]
                        const dateTime = item["startDate"]
                        if (item.dependentId) {
                            if (item.dependentDetails[0]) {
                                const note2 = item.dependentDetails[0]["name"]
                                sortedData[index]["note"] = note2
                            } else {
                                null
                            }
                        } else {
                            if (item.patientDetails[0]) {
                                const note2 = item.patientDetails[0]["name"]
                                sortedData[index]["note"] = note2
                            }
                            else {
                                null
                            }
                        }
                        result[index]["duration"] = "00:" + note1 + ":00"
                        result[index]["start"] = dateTime + ":00"
                        return item
                    })
                    const endIndex = page * pageSize
                    const startIndex = endIndex - pageSize
                    const ongoingProduct = sortedData.filter((data) => {
                        if (data.status === "Ongoing")
                            return data
                    })
                    const ongoing = ongoingProduct.slice(startIndex, endIndex);
                    const totalOngoingPages = Math.ceil(ongoingProduct.length / pageSize);

                    const CompletedProduct = sortedData.filter((data) => {
                        if (data.status === "Completed")
                            return data
                    })
                    const completed = CompletedProduct.slice(startIndex, endIndex);
                    const totalCompletedPages = Math.ceil(CompletedProduct.length / pageSize);

                    const CancelledProduct = sortedData.filter((data) => {
                        if (data.status === "Cancelled")
                            return data
                    })
                    const cancelled = CancelledProduct.slice(startIndex, endIndex);
                    const totalCancelledPages = Math.ceil(CancelledProduct.length / pageSize);

                    const IncompleteProduct = sortedData.filter((data) => {
                        if (data.status === "Incomplete")
                            return data
                    })
                    const incomplete = IncompleteProduct.slice(startIndex, endIndex);
                    const totalIncompletePages = Math.ceil(IncompleteProduct.length / pageSize);
                    res.send({
                        test, ongoing: ongoing, totalOngoingPages,
                        completed: completed, totalCompletedPages,
                        cancelled: cancelled, totalCancelledPages,
                        incomplete: incomplete, totalIncompletePages,

                    });
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

    async updateIncompleteStatus(req, res, next) {
        let data = {
            status: req.body.status,
        }
        await Payment.findByIdAndUpdate({ _id: req.params.patientAppointmentId }, data, function (err, data) {
            if (err) {
                res.json(err);
            }
            else {
                res.send(data);
            }
        });
    },

    async getBookingDetailsByPatientId(req, res, next) {
        const patientId = mongoose.Types.ObjectId(req.params.patientId);
        const page = req.query.page ? parseInt(req.query.page) : 1;
        const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 6;
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
                    const sortedData = result.sort((data1, data2) => (data2.selectedDate) - (data1.selectedDate))
                    const test = sortedData.map(function (item, index) {
                        const note1 = item["timeSlot"]
                        const dateTime = item["startDate"]
                        const note2 = item.doctorDetails[0]["name"]
                        sortedData[index]["note"] = "Dr." + note2
                        sortedData[index]["duration"] = "00:" + note1 + ":00"
                        sortedData[index]["start"] = dateTime + ":00"
                        return item
                    })
                    const endIndex = page * pageSize
                    const startIndex = endIndex - pageSize
                    const ongoingProduct = sortedData.filter((data) => {
                        if (data.status === "Ongoing")
                            return result
                    })
                    const ongoing = ongoingProduct.slice(startIndex, endIndex);
                    const totalOngoingPages = Math.ceil(ongoingProduct.length / pageSize);

                    const CompletedProduct = sortedData.filter((data) => {
                        if (data.status === "Completed")
                            return result
                    })
                    const completed = CompletedProduct.slice(startIndex, endIndex);
                    const totalCompletedPages = Math.ceil(CompletedProduct.length / pageSize);

                    const CancelledProduct = sortedData.filter((data) => {
                        if (data.status === "Cancelled")
                            return result
                    })
                    const cancelled = CancelledProduct.slice(startIndex, endIndex);
                    const totalCancelledPages = Math.ceil(CancelledProduct.length / pageSize);
                    const IncompleteProduct = sortedData.filter((data) => {
                        if (data.status === "Incomplete")
                            return result
                    })
                    const incomplete = IncompleteProduct.slice(startIndex, endIndex);
                    const totalIncompletePages = Math.ceil(IncompleteProduct.length / pageSize);
                    res.send({
                        test, ongoing: ongoing, totalOngoingPages,
                        completed: completed, totalCompletedPages,
                        cancelled: cancelled, totalCancelledPages,
                        incomplete: incomplete, totalIncompletePages,
                    })
                }
            })
    },

    async cancelAppointment(req, res) {
        await Payment.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: new Date(), status: "Cancelled" });
        res.status(200).json('user Deleted');
    },
}