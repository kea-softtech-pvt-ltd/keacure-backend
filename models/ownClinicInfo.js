const mongoose = require('mongoose');

const ownClinicInfo = new mongoose.Schema({
    clinicId         :mongoose.Schema.Types.ObjectId,
    doctorId         :mongoose.Schema.Types.ObjectId,
    specialization   :[],
    clinicName       :String,
    address          :String,
    clinicNumber     :Number,
    services         :[],
    fees             :String
},  {collection: 'ownClinicInfos' });

module.exports = OwnClinic = mongoose.model('ownClinicInfo', ownClinicInfo);