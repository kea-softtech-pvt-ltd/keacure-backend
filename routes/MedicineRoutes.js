const express                   = require("express");
router                          = express.Router();
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require("firebase/storage");
const multer = require("multer");
const medicineList_forDoctor = require("./controllers/medicinelist_forDoctor");

const { v4: uuidv4 } =  require('uuid');
const path           =  require("path");

//update data cb=callback
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null,'../../public/uploads');
  },
  filename: function(req, file, cb) {   
    cb(null, uuidv4()+ '-' + Date.now()  + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpg','image/jpeg', 'image/png', 'text/csv' ,'application/pdf']
  if(allowedFileTypes.includes(file.mimetype)) {
      return cb(null, true);
  } else {
      return cb(null, false);
  }
}

let upload = multer({ storage: storage, fileFilter:fileFilter}).single('file');
module.exports = function (app) {
  //for perticular doctor medicine list
  router.route('/add_mymedicines_list').post(upload,(...params) => medicineList_forDoctor.InsertMedicineList(...params));
  router.route('/get_mymedicines_list/:medicalId').get((...params) => medicineList_forDoctor.getMedicineList(...params));
  
  app.use('/api', router);
};
  