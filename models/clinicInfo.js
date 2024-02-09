const mongoose = require('mongoose');

const clinicInfo = new mongoose.Schema({
    clinicId         : mongoose.Schema.Types.ObjectId,
    doctorId         : mongoose.Schema.Types.ObjectId,
    // specialization   : [],
    clinicLogo       : String,
    clinicName       : String,
    address          : String,
    clinicNumber     : String,
    services         : [],
    isDeleted: {
        type: Boolean,
        default: false,
    },
    deletedAt: {
        type: Date,
        default: null,
    },
},  {collection: 'clinicInfos' });
module.exports = Clinic = mongoose.model('clinicInfo', clinicInfo);