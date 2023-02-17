const MedicalReport = require("../models/patient_medical_report");
const MedicineList = require("../models/medicine_ListModel")
const MedicinePrescription = require("../models/medicine_Prescription")
const LabPrescription = require("../models/lab_testPrescription")
const LabTest = require("../models/lab_TestModel")

module.exports = {
    async InsertMedicalData(req, res, next) {
        // const medicalData = new MedicalReport({
        //     doctorId                : req.body.doctorId,
        //     patientId               : req.body.patientId,
        //     patientAppointmentId    : req.body.patientAppointmentId,
        // })
        // medicalData.save();
        // res.json(medicalData);
        const doctorId = req.body.doctorId
        const patientId = req.body.patientId
        const patientAppointmentId = req.body.patientAppointmentId
        try {
            const userExit = await MedicalReport.findOne({ patientAppointmentId: patientAppointmentId });
            if (userExit) {
                MedicalReport.findByIdAndUpdate({
                    patientAppointmentId: userExit.patientAppointmentId,
                    patientId: userExit.patientId,
                    doctorId: userExit.doctorId,
                    _id: userExit._id
                }
                    , { new: true }, function (err, data) {
                        if (err) {
                            res.json(err);
                        }
                        else {
                            res.json(data);
                            console.log(data)
                        }
                    })
            } else {
                const medicalData = new MedicalReport({
                    doctorId,
                    patientId,
                    patientAppointmentId,
                })
                await medicalData.save();
                res.json(medicalData);

            }
        } catch (err) {
            console.log(err);
        }
    },

    async InsertInvestigationData(req, res, next) {
        let data = {
            investigation_note: req.body.investigation_note,
        }
        await MedicalReport.findByIdAndUpdate({ _id: req.params.reportId }, data, function (err, data) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(data);
            }
        });
    },

    async InsertVitalSignsData(req, res, next) {
        let data = {
            age         : req.body.age,
            weight      : req.body.weight,
            height      : req.body.height,
            BMI         : req.body.BMI,
            temp        : req.body.temp,
            bp          : req.body.bp,
            pulse       : req.body.pulse,
            problem     : req.body.problem,
        }
        await MedicalReport.findByIdAndUpdate({ _id: req.params.reportId }, data, function (err, data) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(data);
            }
        });
    },

    async InsertPremedicationData(req, res, next) {
        let data = {
            premedication_note: req.body.premedication_note,
        }
        MedicalReport.findByIdAndUpdate({ _id: req.params.reportId }, data, function (err, data) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(data);
            }
        });
    },

    async InsertFollowUpDate(req, res, next) {
        let data = {
            new_follow_up: req.body.new_follow_up,
        }
        MedicalReport.findByIdAndUpdate({ _id: req.params.reportId }, data, function (err, data) {
            if (err) {
                res.json(err);
            }
            else {
                res.json(data);
            }
        });
    },


    //for medicine
    async InsertMedicinePrescriptionData(req, res, next) {
        const prescriptionData = new MedicinePrescription({
            doctorId: req.body.doctorId,
            patientId: req.body.patientId,
            reportId: req.body.reportId,
            medicineName: req.body.medicineName,
            patientAppointmentId: req.body.patientAppointmentId,
            weight: req.body.weight,
            days: req.body.days,
            timing: req.body.timing,
            frequency: req.body.frequency,
        })
        prescriptionData.save();
        MedicalReport.findOneAndUpdate(
            { _id: req.body.reportId },
            { $push: { medicine_Prescriptions: prescriptionData._id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );
        res.json(prescriptionData);
    },


    async fetchmedicineData(req, res, next) {
        await MedicineList.find()
            .then(med => res.json(med))
    },

    async fetchMedicalData(req, res, next) {
        await MedicalReport.find({ patientAppointmentId: req.params.patientAppointmentId, doctorId: req.params.doctorId, patientId: req.params.patientId }, function (err, doc) {
            res.send(doc);
        })
    },


    async fetchmedicinePrescriptionData(req, res, next) {
        await MedicinePrescription.find({ patientAppointmentId: req.params.patientAppointmentId, doctorId: req.params.doctorId, patientId: req.params.patientId }, function (err, doc) {
            res.send(doc);
        })
    },

    //for lab testing
    async InsertLabPrescriptionData(req, res, next) {
        const testData = new LabPrescription({
            doctorId: req.body.doctorId,
            patientId: req.body.patientId,
            reportId: req.body.reportId,
            patientAppointmentId: req.body.patientAppointmentId,
            test_name: req.body.test_name,
            category: req.body.category,
            test_method: req.body.test_method,
            specimen_type: req.body.specimen_type,
        })
        testData.save()

        MedicalReport.findOneAndUpdate(
            { _id: req.body.reportId },
            { $push: { labTest_Prescriptions: testData._id } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );
        res.json(testData);
    },

    async fetchLabTestData(req, res, next) {
        await LabTest.find()
            .then(lab => res.json(lab))
    },

    async fetchLabTestPrescriptionData(req, res, next) {
        await LabPrescription.find({ patientAppointmentId: req.params.patientAppointmentId, doctorId: req.params.doctorId, patientId: req.params.patientId }, function (err, doc) {
            res.send(doc);
        })
    },
}