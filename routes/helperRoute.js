const express = require('express')
router = express.Router();
const helperController = require('./controllers/helperController')

module.exports = function (app) {
    router.route('/addhelper').post((...params) => helperController.AddHelper(...params))
    router.route('/helperlogin').post((...params) => helperController.HelperLogin(...params))
    router.route('/accessmodule').get((...params) => helperController.GetAccessModule(...params))
    router.route('/gethelpers').get((...params)=>helperController.getHelper(...params))
app.use('/api', router)
}
