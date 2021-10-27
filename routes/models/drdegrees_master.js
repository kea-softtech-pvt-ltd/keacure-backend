const mongoose = require('mongoose');

const degrees = new mongoose.Schema({
    degree   :String
},  {collection: 'doctorDegrees_master' });

module.exports = Degrees = mongoose.model('degrees', degrees);