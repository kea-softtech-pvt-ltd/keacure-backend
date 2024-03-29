const MedicalReport = require("../models/patient_medical_report");
const MedicineList = require("../models/medicine_ListModel")
const PatientLogin = require('../models/patientProfile')
const DoctorLogin = require('../models/doctorprofile')
const clinicInfo = require('../models/clinic')
const doctorEducation = require('../models/doctorEducation')
const MedicinePrescription = require("../models/medicine_Prescription")
const LabPrescription = require("../models/lab_testPrescription")
const LabTest = require("../models/lab_TestModel")
const symptomsList = require("../models/symptoms");
const fs = require('fs'); 
const PuppeteerHTMLPDF = require('puppeteer-html-pdf');
const readFile = require('util').promisify(fs.readFile);
const mongoose = require('mongoose');
const hbs = require('hbs');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const fbStorage = getStorage();

module.exports = {
    async InsertMedicalData(req, res, next) {
        const doctorId = req.body.doctorId
        const patientId = req.body.patientId
        const clinicId = req.body.clinicId
        const patientAppointmentId = req.body.patientAppointmentId
        try {
            const userExit = await MedicalReport.findOne({ patientAppointmentId: patientAppointmentId });
            if (userExit) {
                MedicalReport.findByIdAndUpdate({
                    patientAppointmentId: userExit.patientAppointmentId,
                    patientId: userExit.patientId,
                    doctorId: userExit.doctorId,
                    clinicId: userExit.clinicId,
                    _id: userExit._id
                }
                    , { new: true }, function (err, data) {
                        if (err) {
                            res.json(err);
                        }
                        else {
                            res.json(data);
                        }
                    })
            } else {
                const medicalData = new MedicalReport({
                    doctorId,
                    patientId,
                    clinicId,
                    patientAppointmentId,
                })
                await medicalData.save();
                res.json(medicalData);

            }
        } catch (err) {
            console.log(err);
        }
    },

    async createPrescriptionPdf(req, res, next) {
        const id = req.params.reportId;
        var dateString = new Date(new Date().getTime() - (new Date().getTimezoneOffset() * 60000))
            .toISOString()
            .split("T")[0];
        await MedicalReport.aggregate([
            { "$match": { "_id": mongoose.Types.ObjectId(req.params.reportId) } },
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
                    from: DoctorLogin.collection.name,
                    localField: "doctorId",
                    foreignField: "_id",
                    as: "doctorDetails",
                }
            },
            {
                $lookup: {
                    from: doctorEducation.collection.name,
                    localField: "doctorId",
                    foreignField: "doctorId",
                    as: "educationList",
                }
            },
            {
                $lookup: {
                    from: clinicInfo.collection.name,
                    localField: "clinicId",
                    foreignField: "_id",
                    as: "clinicList",
                }
            },
            {
                $lookup: {
                    from: MedicinePrescription.collection.name,
                    localField: "medicine_Prescriptions.id",
                    foreignField: "_id",
                    as: "medicineList"
                }
            },
            {
                $lookup: {
                    from: LabPrescription.collection.name,
                    localField: "labTest_Prescriptions.id",
                    foreignField: "_id",
                    as: "labTestList"
                }
            },
        ])
            .exec(async (err, result) => {
                if (err) {
                    res.send(err);
                }
                if (result) {
                    const medicineList = result[0].medicineList
                    const testList = result[0].labTestList

                    const pdfData = {
                        DoctorData: {
                            Name: result[0].doctorDetails[0].name,
                            Mobile: result[0].doctorDetails[0].mobile,
                            degree: (result[0].educationList.length > 0) ? result[0].educationList[0].degree : "",
                            clinicName: result[0].clinicList[0].clinicName,
                            address: result[0].clinicList[0].address,
                            services: result[0].clinicList[0].services,
                            Date: dateString
                        },
                        patientData: {
                            Name: result[0].patientDetails[0].name,
                            Mobile: result[0].patientDetails[0].mobile,
                            Gender: result[0].patientDetails[0].gender,
                        },
                        vitalSign: {
                            BMI: result[0].BMI,
                            age: result[0].age,
                            bp: result[0].bp,
                            height: result[0].height,
                            weight: result[0].weight,
                            pulse: result[0].pulse,
                            temp: result[0].temp,
                        },
                        medicineList: {
                            medicineList
                        },
                        labtestList: {
                            testList
                        }
                    }
                    const htmlPDF = new PuppeteerHTMLPDF();
                    const options = {
                        format: 'A4',
                        path: `public/storage/invoice-${id}.pdf`
                    }
                    try {
                        htmlPDF.setOptions(options);
                        const html = await readFile('views/invoice.hbs', 'utf8');
                        const template = hbs.compile(html);
                        const content = template(pdfData);
                        const buffer = await htmlPDF.create(content);
                        const storageRef = ref(fbStorage, `files/invoice-${id}.pdf`);
                        // Create file metadata including the content type
                        const metadata = {
                            contentType: "application/pdf",
                        };
                        // Upload the file in the bucket storage
                        const snapshot = await uploadBytesResumable(storageRef, buffer, metadata);
                        // Grab the public url
                        const downloadURL = await getDownloadURL(snapshot.ref);
                        await MedicalReport.findByIdAndUpdate({ _id: id }, { pdfUrl: `files/invoice-${id}.pdf` }, { new: true });
                        return res.send({
                            message: 'file uploaded to firebase storage',
                            name: `invoice-${id}.pdf`,
                            type: "application/pdf",
                            downloadURL: downloadURL
                        })
                    } catch (error) {
                        res.send('Something went wrong.')
                    }
                }
            })
    },

    async getPdfPrescription(req, res, next) {
        const reportData = await MedicalReport.findOne({ _id: req.params.reportId });
        res.send(reportData.pdfUrl)
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

    async InsertSymptomsData(req, res, next) {
        let data = {
            symptoms: req.body.symptoms,
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
            age: req.body.age,
            weight: req.body.weight,
            height: req.body.height,
            BMI: req.body.BMI,
            temp: req.body.temp,
            bp: req.body.bp,
            pulse: req.body.pulse,
            problem: req.body.problem,
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
            { $push: { medicine_Prescriptions: { id: prescriptionData._id } } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    (success);
                }
            }
        );
        res.json(prescriptionData);
    },

    async fetchmedicinePrescriptionData(req, res, next) {
        await MedicinePrescription.find({
            reportId: req.params.reportId,
        }, function (err, doc) {
            res.send(doc);
        })
    },

    async fetchmedicineData(req, res, next) {
        await MedicineList.find()
            .then(med => res.json(med))
    },

    async fetchMedicalData(req, res, next) {
        await MedicalReport.find({
            _id: req.params.reportId
        }, function (err, doc) {
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
            { $push: { labTest_Prescriptions: { id: testData._id } } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    // console.log(success);
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
        await LabPrescription.find({
            reportId: req.params.reportId,
        }, function (err, doc) {
            res.send(doc);
        })
    },

    async downloadPrescription(req, res, next) {
        const file = fs.createWriteStream("file.pdf");
        const pathReference = ref(fbStorage, `files/invoice-${req.params.reportId}.pdf`);
        const imgUrl = await getDownloadURL(pathReference)
        return res.send(imgUrl);
    },

    //for symptoms=========
    async fetchSymptomsData(req, res, next) {
        await symptomsList.find()
            .then(med => res.json(med))
    },

    async addSymptomsData(req, res, next) {
        const symptom = new symptomsList({
            name: req.body.symptoms,
        })
        symptom.save();
        res.json(symptom);
    },
}