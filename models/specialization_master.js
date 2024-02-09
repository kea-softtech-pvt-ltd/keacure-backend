const mongoose = require('mongoose');

const specialization = new mongoose.Schema({
    specialization   :String
},  {collection: 'specializations_master' });

module.exports = Specialization = mongoose.model('specialization', specialization);