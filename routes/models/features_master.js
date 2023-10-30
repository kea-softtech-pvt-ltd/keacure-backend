const mongoose = require('mongoose');

const features = new mongoose.Schema({
    name:String,
}, { collection: 'features_master' });

module.exports = Feature = mongoose.model('features', features);