const express = require('express');
const Clinic = require('../models/clinicInfo');
const clinicService = require('../models/clinicServiceModule');
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
                res.send({ clinicData: paginatedClinic, totalPages });
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
    //  async getFeatures(req, res, next) {
    //     await features_master.find(function (err, docs) {
    //         res.send(docs)
    //     })
    // },

}