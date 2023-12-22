const medicineList_forDoctor = require("../models/medicineList_forDoctor");
const { Readable } = require('stream');
const csv = require('csv-parser')
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const fbStorage = getStorage();

module.exports = {
    //for medicine
    async InsertMedicineList(req, res, next) {
        const file = req.files.file;
        const medicineId = req.body.medicines_code;
        const stream = Readable.from(file.data);
        const csvData = []
        stream.pipe(csv())
            .on("data", (data) => {
                csvData.push(data)
            })
            .on("end", async () => {
                const MedicineList = new medicineList_forDoctor({
                    file: csvData,
                    medicines_code: medicineId,
                })
                await MedicineList.save();
                //store csv file in firebase storage
                const storageRef = ref(fbStorage, `csvFiles/medicinelist__${medicineId}.csv`);
                const metadata = {
                    contentType: "text/csv",
                };
                const snapshot = await uploadBytesResumable(storageRef, file.data, metadata);
                const downloadURL = await getDownloadURL(snapshot.ref);
            });
    },

    async getMedicineList(req, res, next) {
        // console.log("-------", res)
        await medicineList_forDoctor.find({ medicines_code: req.params.medicineId })
            .then(res =>console.log("-------", res))
    }
}