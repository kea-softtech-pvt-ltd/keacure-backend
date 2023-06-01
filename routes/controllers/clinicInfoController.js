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
      //  const result = await clinicInfoSchema.validateAsync(req.body)
        const newClinicData    =    new Clinic({
        doctorId         :   req.body.doctorId,
        specialization   :   req.body.specialization,
        clinicName       :   req.body.clinicName,
        address          :   req.body.address,
        clinicNumber     :   req.body.clinicNumber,
        services         :   req.body.services,
       // fees             :   result.fees
        })
        newClinicData.save();
        res.json(newClinicData);
    }
}