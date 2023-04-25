const OwnClinic      =  require('../models/ownClinicInfo');
const {ownClinicInfoSchema} = require('../auth/doctorSchemasValidate')

module.exports ={
    async fetchOwnClinicData(req ,res,next){
        await OwnClinic.find({doctorId: req.params.id})
        .then(clinic => res.json(clinic))
    },

    async insertOwnClinicData(req ,res ,next){
        const result = await ownClinicInfoSchema.validateAsync(req.body)
        const newOwnClinicData    = new OwnClinic({
            doctorId         : result.doctorId,
            specialization   : result.specialization,
            clinicName       : result.clinicName,
            address          : result.address,
            clinicNumber     : result.clinicNumber,
            services         : result.services
        })
        newOwnClinicData.save();
        res.json(newOwnClinicData);
    }
}