const express     = require('express'),
router            = express.Router();
const clinicInfoRoute = require('./controllers/clinicInfoController');
const ownClinicInfoRoute = require('./controllers/ownClinicInfoController');
const setSessionRoutec = require('./controllers/setSessionController');

module.exports = function(app){
    //create clinic route
    router.route('/fetchclinic/:id').get((...params)=>{clinicInfoRoute.fetchClinicById(...params)});
    router.route('/insertclinic').post((...params)=>{clinicInfoRoute.insertAllClinic(...params)})
    
    //create ownClinic Route
    router.route('/fetchownclinic/:id').get((...params)=>{ownClinicInfoRoute.fetchOwnClinicData(...params)})
    router.route('/insertownclinic').post((...params)=>{ownClinicInfoRoute.insertOwnClinicData(...params)})

    //create session Route
    router.route('/setSession').post((...params)=>{setSessionRoutec.setSessionData(...params)})
    router.route('/fetchtime').post((...params)=>{setSessionRoutec.fetchSessionData(...params)})
    router.route('/fetchtime/:id').get((...params)=>{setSessionRoutec.fetchSessionDataById(...params)})
    router.route('/fetcSessionSlots/:doctorId/:clinicId').get((...params)=>{setSessionRoutec.getSessionDataById(...params)})
    router.route('/fetchDaysSlots').post((...params)=>{setSessionRoutec.getDaysSlots(...params)})
    ///:doctorId/:clinicId/:day/:Appointment
    
    app.use('/api',router)
}
