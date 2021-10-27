const Allergy   =  require('../models/allergies_master');
  
module.exports = {
  async getAllAllergies(req, res, next) {    
    Allergy.find()
      .then(foundAllergy => res.json(foundAllergy))
  }
}  