const mongoose = require('mongoose');

const patientMedicalInfo = new mongoose.Schema({
    patientId        :{ type: mongoose.Schema.Types.ObjectId },
    allergies        :String,
    cmedication      :String,
    pmedication      :String,
    diseases         :String,
    injuries         :String,
    surgeries        :String
},{collection:'patientMedicalInfos'});

module.exports = PatientMedical = mongoose.model(' patientMedicalInfo',  patientMedicalInfo);