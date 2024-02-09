const mongoose = require('mongoose');

const medicineList = new mongoose.Schema({
        medicine_name : String,
        size          : String,
        manufacturer  : String
}, { collection: 'medicines_Master' });

module.exports = MedicineList = mongoose.model('medicineList', medicineList);