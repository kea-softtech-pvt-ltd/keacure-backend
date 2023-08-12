const express     = require('express'),
router            = express.Router();
const admimnController = require('./controllers/adminController');

module.exports = function(app){
    //create clinic route
    router.route('/login').post((...params)=>{admimnController.loginAdmin(...params)});   
    app.use('/api',router)
}
