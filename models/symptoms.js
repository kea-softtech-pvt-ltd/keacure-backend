const mongoose = require('mongoose');

const symptomsList = new mongoose.Schema({
        name : String,
}, { collection: 'symptoms_master' });

module.exports = SymptomsList = mongoose.model('symptomsList', symptomsList);