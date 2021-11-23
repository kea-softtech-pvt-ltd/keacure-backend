const mongoose = require("mongoose");

const patientLifestyleInfo = new mongoose.Schema({
    patientId     : { type: mongoose.Schema.Types.ObjectId },
    smokingHabits : String ,
    activitylevel : String ,
    alcoholConsumption : String ,
    foodPreferences : String ,
    occupation : String
},{collection:'patientLifestyleInfos'});

module.exports = PatientLifestyle = mongoose.model('patientLifestyleInfo' , patientLifestyleInfo);
