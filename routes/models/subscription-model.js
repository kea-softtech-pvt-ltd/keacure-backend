const mongoose = require('mongoose');

const subscriptionModel = new mongoose.Schema({
    doctorId            : mongoose.Schema.Types.ObjectId,
    registerDate        : String,
    selected_plan       : String,
    isSubscribe         : Boolean
}, { collection: 'subscriptions' })
module.exports = Subscription = mongoose.model("subScriptionModel", subscriptionModel)