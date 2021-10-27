const express     = require('express'),
router            = express.Router();
const allergiesRoute = require('./controllers/allergiesController');
const drdegreesRoute = require('./controllers/drdegreesController');
const specializationRoute = require('./controllers/specializationController');

module.exports = function (app) {
    router.route('/getAllergies').get((...params) => {allergiesRoute.getAllAllergies(...params)});
  
    router.route('/drdegrees').get((...params) => {drdegreesRoute.getAllDegrees(...params)});
  
    router.route('/drspecialization').get((...params) => {specializationRoute.getAllSpecialization(...params)});
    
    app.use('/api', router);
  };