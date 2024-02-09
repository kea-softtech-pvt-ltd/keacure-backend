const express = require('express'),
router = express.Router();
const doctorEducationsRoute = require('../controllers/doctorEducationsController')
const { 
  isSubscribed, 
  isDrLoggedIn 
} = require("../services/auth")

module.exports = function (app) {
  router.route('/fetchEduData/:doctorId').get(
    isDrLoggedIn,
    isSubscribed,
    (...params) => { doctorEducationsRoute.fetchEducationData(...params) });
  router.route('/fetchEduData').get((...params) => { doctorEducationsRoute.fetchEducationData(...params) });
  router.route('/fetchAllEduData').get((...params) => { doctorEducationsRoute.fetchAllEducationData(...params) });
  router.route('/fetchEditEduData/:id').get((...params) => { doctorEducationsRoute.fetchAllEditEducationData(...params) });
  router.route('/education').post((...params) => { doctorEducationsRoute.allEducationData(...params) });
  router.route('/updateEducation/:id').post((...params) => { doctorEducationsRoute.allUpdateEducationData(...params) });
  router.route('/deleteDocument/:id').post((...params) => { doctorEducationsRoute.deleteEducationData(...params) });
  router.route('/deleteeducation/:id').delete((...params) =>{ doctorEducationsRoute.deleteEducationById(...params) });
  
  app.use('/api', router);
};