const express        =  require('express');
const router         =  express.Router();
const Clinic         =  require('../models/clinicInfo');
module.exports={
    async fetchClinicById (req,res,next){ 
        await Clinic.find({doctorId: req.params.id})
        .then(clinic => res.json(clinic))
    },

    async insertAllClinic(req,res,next){
        const newClinicData    =    new Clinic({
        doctorId         :    req.body.doctorId,
        specialization   :    req.body.specialization,
        clinicName       :    req.body.clinicName,
        address          :    req.body.address,
        clinicNumber     :    req.body.clinicNumber,
        services         :    req.body.services,
        fees             :    req.body.fees
        })
        newClinicData.save();
        res.json(newClinicData);
    }
}