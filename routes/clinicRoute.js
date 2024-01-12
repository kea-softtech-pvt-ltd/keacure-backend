const express     = require('express'),
router            = express.Router();
const clinicInfoRoute = require('./controllers/clinicInfoController');
const ownClinicInfoRoute = require('./controllers/ownClinicInfoController');
const setSessionRoutec = require('./controllers/setSessionController');

module.exports = function(app){
    //create clinic route
    router.route('/fetchclinic/:id').get((...params)=>{clinicInfoRoute.fetchClinicById(...params)});
    router.route('/insertclinic').post((...params)=>{clinicInfoRoute.insertAllClinic(...params)})
    router.route('/clinicservicess').get((...params)=>{clinicInfoRoute.clinicAllServices(...params)})
    router.route('/deleteclinic/:clinicId').delete((...params)=>{clinicInfoRoute.deleteClinic(...params)})
    
    //create ownClinic Route
    router.route('/fetchownclinic/:id').get((...params)=>{ownClinicInfoRoute.fetchOwnClinicData(...params)})
    router.route('/insertownclinic').post((...params)=>{ownClinicInfoRoute.insertOwnClinicData(...params)})

    //create session Route
    router.route('/setSession').post((...params)=>{setSessionRoutec.setSessionData(...params)})
    router.route('/setSession/:id').post((...params)=>{setSessionRoutec.updateSessionData(...params)})
    router.route('/fetchsetSession/:id').get((...params)=>{setSessionRoutec.fetchSetSessionData(...params)})
    router.route('/fetchtime').post((...params)=>{setSessionRoutec.fetchSessionData(...params)})
    router.route('/fetchtime/:id').get((...params)=>{setSessionRoutec.fetchSessionDataById(...params)})

    //for patient que
    router.route('/fetcSessionSlots/:doctorId/:clinicId').get((...params)=>{setSessionRoutec.getSessionDataById(...params)})
    router.route('/fetchDaysSlots').get((...params)=>{setSessionRoutec.getDaysSlots(...params)})
    router.route('/deleteSlots/:id').delete((...params)=>{setSessionRoutec.deleteSessionData(...params)})
   
    // All clinics
    router.route('/clinics').get((...params)=>{clinicInfoRoute.clinicData(...params)})
    router.route('/clinics/:doctorId').post((...params)=>{clinicInfoRoute.setClinicData(...params)})
    router.route('/addclinicid/:doctorId').post((...params)=>{clinicInfoRoute.addClinicId_DoctorData(...params)})

    app.use('/api',router)
}
