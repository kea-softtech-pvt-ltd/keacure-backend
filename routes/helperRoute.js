const express = require('express')
router = express.Router();
const helperController = require('./controllers/helperController')

module.exports = function (app) {
    router.route('/addhelper').post((...params) => helperController.AddHelper(...params))
    router.route('/helperlogin').post((...params) => helperController.HelperLogin(...params))
    router.route('/accessmodule').get((...params) => helperController.GetAccessModule(...params))
    router.route('/gethelpers/:doctorId').get((...params)=>helperController.getHelper(...params))
    router.route("/edithelper/:id").post((...params)=>helperController.editHelper(...params))
    router.route('/deletehelper/:id').delete((...params)=>helperController.deleteHelper(...params))
    router.route('/fetchhelper/:id').get((...params)=>helperController.fetchHelper(...params))
app.use('/api', router)
}
