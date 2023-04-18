const express     = require('express'),
router            = express.Router();
const paymentController = require('./controllers/paymentController');

module.exports = function (app) {
  router.route('/razorpay/order').post((...params)=>paymentController.getPaymentDetails(...params));
  router.route('/payment/order').post((...params)=>paymentController.getOrderedPaymentDetails(...params));
  router.route('/getBookingData/:doctorId/:clinicId').get((...params)=>paymentController.fetchPaymentDataByDoctorId(...params));
  router.route('/getBookingData/:doctorId').get((...params)=>paymentController.getBookingDetailsWithPatientDataBydoctorId(...params));
  router.route('/getBookings/:patientId').get((...params)=>paymentController.getBookingDetailsByPatientId(...params));
  router.route('/updateStatus/:patientAppointmentId').post((...params)=>paymentController.updateStatus(...params));
  
  // create route for patient queue
  router.route('/fetchSelectedDaySlots/:doctorId/:clinicId/:daySlotId').post((...params)=>{paymentController.getDaySlots(...params)})
  app.use('/api', router);
};