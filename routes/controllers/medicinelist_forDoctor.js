const medicineList_forDoctor = require("../models/medicineList_forDoctor");
const csvtojson = require("csvtojson");

module.exports = {
    //for medicine
    async InsertMedicineList(req, res, next) {
        const fileName = req.body.medicineslist;
        const MedicineList = new medicineList_forDoctor({
            medicineList: fileName,
            medicines_code: req.body.medicines_code,
        })
        await MedicineList.save();
    },

    async getMedicineList (req,res,next){ 
        await medicineList_forDoctor.find({medicines_code: req.params.medicalId})
        .then(res => res.json(res))
    }
}