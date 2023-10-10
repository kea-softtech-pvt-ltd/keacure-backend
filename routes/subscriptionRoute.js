const express     = require('express'),
router            = express.Router();
const subscriptionController = require('./controllers/subscriptionContoller')

module.exports = function (app) {
  //subscription 
  router.route('/subscription').post((...params)=>subscriptionController.addSubscription(...params));
  router.route('/getsubscription/:doctorId').get((...params)=>subscriptionController.getSubscription(...params));
  router.route('/updatesubscriptiondata/:id').post((...params)=>subscriptionController.updateSubscription(...params))
  router.route('/addsubscriptionplans').post((...params)=>subscriptionController.addAdminSubscription(...params))
  router.route('/getsubscriptionplans').get((...params)=>subscriptionController.getAdminSubscription(...params))

  app.use('/api', router);
};