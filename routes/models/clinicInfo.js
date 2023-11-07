const mongoose = require('mongoose');

const clinicInfo = new mongoose.Schema({
    clinicId         : mongoose.Schema.Types.ObjectId,
    doctorId         : mongoose.Schema.Types.ObjectId,
    specialization   : [],
    clinicLogo       : String,
    clinicName       : String,
    address          : String,
    clinicNumber     : String,
    services         : [],
},  {collection: 'clinicInfos' });
module.exports = Clinic = mongoose.model('clinicInfo', clinicInfo);