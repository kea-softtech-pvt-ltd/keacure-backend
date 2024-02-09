const mongoose = require('mongoose');

const labTest = new mongoose.Schema({
    test_name           : String,
    category            : String,
    test_method         : String,
    specimen_type       : String,
    about_test          : String
}, { collection: 'LabTests_Master' });

module.exports = LabTest = mongoose.model('labTest', labTest);