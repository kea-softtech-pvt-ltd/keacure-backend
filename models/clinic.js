const mongoose = require('mongoose');

const clinics = new mongoose.Schema({
    clinicLogo: String,
    clinicName: String,
    address: String,
    clinicNumber: String,
    services: [],
}, { collection: 'clinics' });
module.exports = Clinics = mongoose.model('clinics', clinics);