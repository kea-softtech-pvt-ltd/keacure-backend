const mongoose = require('mongoose');

const ownClinicInfo = new mongoose.Schema({
    clinicId         :mongoose.Schema.Types.ObjectId,
    doctorId         :mongoose.Schema.Types.ObjectId,
    specialization   :String,
    clinicName       :String,
    address          :String,
    clinicNumber     :Number,
    services         :String,
    fees             :String
},  {collection: 'ownClinicInfos' });

module.exports = OwnClinic = mongoose.model('ownClinicInfo', ownClinicInfo);