const mongoose = require('mongoose');

const subscriptionModel = new mongoose.Schema({
    doctorId            : mongoose.Schema.Types.ObjectId,
    registerDate        : String,
    expiryDate          : String,
    selected_plan       : String,
    isSubscribe         : Boolean,
    duration            : String
}, { collection: 'subscriptions' })
module.exports = Subscription = mongoose.model("subScriptionModel", subscriptionModel)