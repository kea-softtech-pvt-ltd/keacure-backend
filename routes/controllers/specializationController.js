const Specialization   =  require('../models/specialization_master');

module.exports = {
    async getAllSpecialization(req, res, next) { 
        Specialization.find()
        .then(clinic => res.json(clinic))
    }
}