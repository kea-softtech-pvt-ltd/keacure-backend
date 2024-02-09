const express = require('express'),
router = express.Router();
const doctorExperienceRoute = require('../controllers/doctorExperienceController')
const { 
    isSubscribed, 
    isDrLoggedIn 
} = require("../services/auth")

module.exports = function (app) {
    router.route('/fetchExData/:doctorId').get(
        isDrLoggedIn,
        isSubscribed,
        (...params) => { doctorExperienceRoute.fetchAllExperienceById(...params) });
    router.route('/fetchExData').get((...params) => { doctorExperienceRoute.fetchAllExperience(...params) });
    router.route('/fetchUpdateExperience/:id').get((...params) => { doctorExperienceRoute.fetchAllEditExperience(...params) });
    router.route('/insertExperience').post((...params) => { doctorExperienceRoute.allExperienceData(...params) });
    router.route('/updateExperience/:id').post((...params) => { doctorExperienceRoute.allExperienceDataById(...params) });
    router.route('/deleteexperience/:id').delete((...params) => { doctorExperienceRoute.deleteExperienceById(...params) });
    app.use('/api', router);
}