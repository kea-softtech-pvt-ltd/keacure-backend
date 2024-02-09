const mongoose = require('mongoose');

const allergies = new mongoose.Schema({
    name:String,
    
}, { collection: 'allergies_master' });

module.exports = Allergy = mongoose.model('allergies', allergies);