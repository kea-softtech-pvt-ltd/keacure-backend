const express = require('express')
router = express.Router();
const helperController = require('./controllers/helperController')

module.exports = function (app) {
    router.route('/addhelper').post((...params) => helperController.addHelper(...params))

app.use('/api', router)
}
