const mongoose = require('mongoose');

const doctorMedicineList = new mongoose.Schema({
        medicineList     : [],
        medicines_code    : String,
}, { collection: 'medicine_csv_withdrIds' });

module.exports = DoctorMedicineList = mongoose.model('doctorMedicineList', doctorMedicineList);