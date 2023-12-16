const medicineList_forDoctor = require("../models/medicineList_forDoctor");
const csvtojson = require("csvtojson");

module.exports = {
    //for medicine
    async InsertMedicineList(req, res, next) {
        console.log("data========>", req.files.file)
        // const fileName = req.files.file;
        // const MedicineList = new medicineList_forDoctor({
        //     file: fileName,
        //     medicines_code: req.body.medicines_code,
        // })
        // await MedicineList.save();
    },

    async getMedicineList (req,res,next){ 
        await medicineList_forDoctor.find({medicines_code: req.params.medicalId})
        .then(res => res.json(res))
    }
}