const express = require('express'),
  router = express.Router();
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require("path");
const doctorEducationsRoute = require('./controllers/doctorEducationsController')

//add data cb=callback
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../keacure-webapp/public/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + '-' + Date.now() + path.extname(file.originalname));
  }
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpg', 'image/jpeg', 'image/png', 'application/vnd.ms-excel', 'application/pdf']
  if (allowedFileTypes.includes(file.mimetype)) {
    return cb(null, true);
  } else {
    return cb(null, false);
  }
}

let upload = multer({ storage: storage, fileFilter: fileFilter }).array('document', 6);

module.exports = function (app) {
  router.route('/fetchEduData/:id').get((...params) => { doctorEducationsRoute.fetchEducationData(...params) });
  router.route('/fetchEduData').get((...params) => { doctorEducationsRoute.fetchEducationData(...params) });
  router.route('/fetchAllEduData').get((...params) => { doctorEducationsRoute.fetchAllEducationData(...params) });
  router.route('/fetchEditEduData/:id').get((...params) => { doctorEducationsRoute.fetchAllEditEducationData(...params) });
  router.route('/education').post(upload, (...params) => { doctorEducationsRoute.allEducationData(...params) });
  router.route('/updateEducation/:id').post(upload, (...params) => { doctorEducationsRoute.allUpdateEducationData(...params) });
  router.route('/deleteDocument/:id').post((...params) => { doctorEducationsRoute.deleteEducationData(...params) });
  router.route('/deleteeducation/:id').delete((...params) =>{ doctorEducationsRoute.deleteEducationById(...params) });
  app.use('/api', router);
};