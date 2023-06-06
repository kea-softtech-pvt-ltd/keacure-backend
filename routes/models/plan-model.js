const mongoose = require('mongoose')

const planModel = new mongoose.Schema({
    freeTrial              : String,
    sixMonthSubscription   : String,
    yearlySubscription     : String,
}, { collection: "subscriptionPlans" })
module.exports = planModel = mongoose.model('planModel', planModel)