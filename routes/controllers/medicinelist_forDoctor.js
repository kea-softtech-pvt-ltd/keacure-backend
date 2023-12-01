const medicineList_forDoctor = require("../models/medicineList_forDoctor");

module.exports = {
    //for medicine
    async InsertMedicineList(req, res, next) {
        const MedicineList = new medicineList_forDoctor({
            medicineList    : req.body.medicineslist,
            medicines_code  : req.body.medicines_code,
        })
        MedicineList.save();
    },

    async getMedicineList(req, res, next) {
        await medicineList_forDoctor.find()
            .then(med => res.json(med))
    },

    async fetchMedicalData(req, res, next) {
        await medicineList_forDoctor.find({
            _id: req.params.reportId
        }, function (err, doc) {
            res.send(doc);
        })
    }
}