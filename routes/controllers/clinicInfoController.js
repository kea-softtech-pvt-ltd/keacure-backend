const express = require('express');
const Clinic = require('../models/clinicInfo');
const clinicService = require('../models/clinicServiceModule')
module.exports = {
    async fetchClinicById(req, res, next) {
        await Clinic.find({ doctorId: req.params.id })
            .then(clinic => res.json(clinic))
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
    //  async getFeatures(req, res, next) {
    //     await features_master.find(function (err, docs) {
    //         res.send(docs)
    //     })
    // },

}