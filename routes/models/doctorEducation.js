const mongoose = require('mongoose');

const doctorEducation = new mongoose.Schema({
    doctorId            :{ type: mongoose.Schema.Types.ObjectId },
    degree              :String,
    collage             :String,
    comYear             :String,
    specialization      :[],
    document            :Array
},{collection: 'doctorEducations' });

module.exports = Doctor = mongoose.model('doctorEducation', doctorEducation);