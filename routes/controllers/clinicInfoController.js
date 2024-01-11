const express = require('express');
const Clinic = require('../models/clinicInfo');
const clinicService = require('../models/clinicServiceModule');
const Clinics = require('../models/clinic')
const DoctorLogin = require('../models/doctorprofile')
const mongoose = require('mongoose');

module.exports = {
    async fetchClinicById(req, res, next) {
        const page = req.query.page || 1;
        const pageSize = parseInt(req.query.pageSize || 5);
        await Clinic.find({ doctorId: req.params.id })
            .then((clinic) => {
                const data = clinic.filter((clinic) => {
                    if (clinic.isDeleted === false) {
                        return clinic
                    }
                })
                const clinics = data
                const startIndex = (page - 1) * pageSize
                const endIndex = page * pageSize
                const paginatedClinic = clinics.slice(startIndex, endIndex);
                const totalPages = Math.ceil(clinics.length / pageSize);
                res.send({clinic, clinicData: paginatedClinic, totalPages });
            })
    },

    async insertAllClinic(req, res, next) {
        const newClinicData = new Clinic({
            doctorId: req.body.doctorId,
            clinicLogo: req.body.clinicLogo,
            specialization: req.body.specialization,
            clinicName: req.body.clinicName,
            address: req.body.address,
            clinicNumber: req.body.clinicNumber,
            services: req.body.services,
        })
        newClinicData.save();
        res.json(newClinicData);
    },

    async clinicAllServices(req, res, next) {
        await clinicService.find(function (err, docs) {
            res.send(docs)
        })
    },

    async deleteClinic(req, res) {
        await Clinic.findByIdAndUpdate({ _id: req.params.clinicId }, { isDeleted: true, deletedAt: new Date() });
        res.status(200).json('Clinic Deleted');
    },

    // all clinics
    async setClinicData(req, res, next) {
        const clinicData = new Clinics({
            clinicLogo: req.body.clinicLogo,
            clinicName: req.body.clinicName,
            address: req.body.address,
            clinicNumber: req.body.clinicNumber,
            services: req.body.services,
        })
        clinicData.save();
        DoctorLogin.findOneAndUpdate(
            { _id: req.params.doctorId },
            { $push: { clinics: { id: clinicData._id } } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    console.log(success);
                }
            }
        );
        res.send(clinicData);
    },

    async addClinicId_DoctorData(req, res, next) {
        const clinicId =  mongoose.Types.ObjectId(req.body.clinicId)
        await DoctorLogin.findOneAndUpdate(
            { _id: req.params.doctorId },
            { $push: { clinics: { id:  clinicId } } },
            function (error, success) {
                if (error) {
                    console.log(error);
                } else {
                    res.send(success);
                }
            }
        );
    },

    async clinicData(req, res, next) {
        await Clinics.find(function (err, docs) {
            res.send(docs)
        })
    },

}