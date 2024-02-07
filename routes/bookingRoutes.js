const express     = require('express'),
router            = express.Router();
const paymentController = require('./controllers/bookingDataController');
const subscriptionController = require('./controllers/subscriptionContoller')
const { isSubscribed, isDrLoggedIn } = require("../services/auth")

module.exports = function (app) {
  //router.route('/razorpay/order').post((...params)=>paymentController.getPaymentDetails(...params));
  router.route('/payment/order').post((...params)=>paymentController.getOrderedPaymentDetails(...params));
  router.route('/getBookingData/:doctorId/:clinicId').get((...params)=>paymentController.fetchPaymentDataByDoctorId(...params));
  router.route('/getBookingData/:doctorId').get(
    isDrLoggedIn,
    isSubscribed,
    (...params)=>{
      paymentController.getBookingDetailsBydoctorId(...params)
    }
  );
  router.route('/getBookings/:patientId').get((...params)=>paymentController.getBookingDetailsByPatientId(...params));
  router.route('/updateStatus/:patientAppointmentId').post((...params)=>paymentController.updateStatus(...params));
  router.route('/updateIncompleteStatus/:patientAppointmentId').post((...params)=>paymentController.updateIncompleteStatus(...params));
  router.route('/cancelappointment/:id').delete((...params)=>{paymentController.cancelAppointment(...params)})
  router.route('/getappointment/:id').get(
    (...params)=>{paymentController.getAppointment(...params)})
  //subscription 
  router.route('/subscription').post((...params)=>subscriptionController.addSubscription(...params));
  router.route('/getsubscription/:doctorId').get(
    isDrLoggedIn,
    isSubscribed,
    (...params)=>subscriptionController.getSubscription(...params));
  router.route('/updatesubscriptiondata/:id').post((...params)=>subscriptionController.updateSubscription(...params))

  app.use('/api', router);
};