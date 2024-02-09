const express                   = require("express");
router                          = express.Router();
const medicineList_forDoctor    = require("../controllers/medicinelist_forDoctor");

module.exports = function (app) {
  // for perticular doctor medicine list
  router.route('/add_mymedicines_list').post((...params) => medicineList_forDoctor.InsertMedicineList(...params));
  //for pagination
  router.route('/get_mymedicines_list/:medicineId').get((...params) => medicineList_forDoctor.getMedicineList(...params));
  //for merge medicine list
  router.route('/get_mymedicines/:medicineId').get((...params) => medicineList_forDoctor.getMedicines(...params));
  
  app.use('/api', router);
};
  