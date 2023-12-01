const mongoose = require('mongoose')

const services_master = new mongoose.Schema({
    name: String
}, { collection: 'services_master' })
module.exports = clinicService = mongoose.model('services_master', services_master)