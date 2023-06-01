const OwnClinic      =  require('../models/ownClinicInfo');
const {ownClinicInfoSchema} = require('../auth/doctorSchemasValidate')

module.exports ={
    async fetchOwnClinicData(req ,res,next){
        await OwnClinic.find({doctorId: req.params.id})
        .then(clinic => res.json(clinic))
    },

    async insertOwnClinicData(req ,res ,next){
        // const result = await ownClinicInfoSchema.validateAsync(req.body)
        const newOwnClinicData    = new OwnClinic({
            doctorId         : req.body.doctorId,
            specialization   : req.body.specialization,
            clinicName       : req.body.clinicName,
            address          : req.body.address,
            clinicNumber     : req.body.clinicNumber,
            services         : req.body.services
        })
        newOwnClinicData.save();
        res.json(newOwnClinicData);
    }
}