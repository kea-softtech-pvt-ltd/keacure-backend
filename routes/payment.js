const express     = require('express'),
router            = express.Router();
const paymentController = require('./controllers/paymentController');


module.exports = function (app) {
  router.route('/razorpay/order').post((...params)=>paymentController.getPaymentDetails(...params));
  router.route('/payment/order').post((...params)=>paymentController.getOrderedPaymentDetails(...params));
  router.route('/payment/:id').get((...params)=>paymentController.fetchDataById(...params));

   // create route for patient queue
   router.route('/fetchSelectedDaySlots/:doctorId/:clinicId/:daySlotId').post((...params)=>{paymentController.getDaySlots(...params)})

  app.use('/api', router);
};