const mongoose = require('mongoose');

const doctorExperience = new mongoose.Schema({
    doctorId          :{ type: mongoose.Schema.Types.ObjectId },
    clinicName        :String,
    startYear         :String,
    endYear           :String,
    description       :String
},{collection: 'doctorExperience' });

module.exports = DoctorExperience = mongoose.model('doctorExperience', doctorExperience);