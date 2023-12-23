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
        console.log("req-------", req.query)
        // const { page, limit } = req.query; 
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        await medicineList_forDoctor.find({
            medicines_code: req.params.medicineId,
        })
            .skip((page - 1) * limit)
            .limit(limit)
            .then((filter) => {
                const data = filter.map((r) => {
                    return r.file
                })
                const filteredData = data.reduce((r, e) => (r.push(...e), r), [])
                const paginatedProducts = filteredData.slice(startIndex, endIndex);

                // Calculate the total number of pages
                const totalPages = Math.ceil(filteredData.length / limit);

                // Send the paginated products and total pages as the API response
                // res.json({ filteredData: paginatedProducts, totalPages });
                res.send({ filteredData: paginatedProducts, totalPages })
            })

    }
}