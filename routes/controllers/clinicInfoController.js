const express        =  require('express');
const router         =  express.Router();
const Clinic         =  require('../models/clinicInfo');
const {clinicInfoSchema} = require('../auth/doctorSchemasValidate')
module.exports={
    async fetchClinicById (req,res,next){ 
        await Clinic.find({doctorId: req.params.id})
        .then(clinic => res.json(clinic))
    },

    async insertAllClinic(req,res,next){
        const result = await clinicInfoSchema.validateAsync(req.body)
        const newClinicData    =    new Clinic({
        doctorId         :   result.doctorId,
        specialization   :   result.specialization,
        clinicName       :   result.clinicName,
        address          :   result.address,
        clinicNumber     :   result.clinicNumber,
        services         :   result.services,
       // fees             :   result.fees
        })
        newClinicData.save();
        res.json(newClinicData);
    }
}