const express = require('express')
router = express.Router();
const helperController = require('../controllers/helperController')
const { isSubscribed, isDrLoggedIn } = require("../services/auth")

module.exports = function (app) {
    router.route('/addhelper').post((...params) => helperController.AddHelper(...params))
    router.route('/helperlogin').post((...params) => helperController.HelperLogin(...params))
    router.route('/accessmodule').get((...params) => helperController.GetAccessModule(...params))
    router.route("/edithelper/:id").post((...params)=>helperController.editHelper(...params))
    router.route('/deletehelper/:id').delete((...params)=>helperController.deleteHelper(...params))
    router.route('/fetchhelper/:id').get((...params)=>helperController.fetchHelper(...params))
    router.route('/gethelpers/:doctorId').get(
        isDrLoggedIn,
        isSubscribed,
        (...params)=>helperController.getHelper(...params))
app.use('/api', router)
}
