const express     = require('express'),
router            = express.Router();
const subscriptionController = require('./controllers/subscriptionContoller')

module.exports = function (app) {
  //features 
  router.route('/getfeatures').get((...params)=>subscriptionController.getFeatures(...params));
  router.route('/addfeatures').post((...params)=>subscriptionController.addFeatures(...params));  
  //subscription 
  router.route('/subscription').post((...params)=>subscriptionController.addSubscription(...params));
  router.route('/getsubscription/:doctorId').get((...params)=>subscriptionController.getSubscription(...params));
  router.route('/updatesubscriptiondata/:id').post((...params)=>subscriptionController.updateSubscription(...params))
  //admin side
  router.route('/addsubscriptionplans').post((...params)=>subscriptionController.addAdminSubscription(...params))
  router.route('/updatesubscriptionplans/:id').post((...params)=>subscriptionController.updateAdminSubscription(...params))
  router.route('/deletesubscriptionplans/:id').delete((...params)=>subscriptionController.deleteAdminSubscription(...params))
  router.route('/getsubscriptionplanById/:id').get((...params)=>subscriptionController.getSubscriptionPlanById(...params))
  router.route('/getsubscriptionplans').get((...params)=>subscriptionController.getAdminSubscription(...params))
  // router.route('https://api.razorpay.com/plans').get((...params)=>subscriptionController.getPlans(...params))
  // router.route('https://api.razorpay.com/plans').post((...params)=>subscriptionController.getSubscriptions(...params))
  
  app.use('/api', router);
};