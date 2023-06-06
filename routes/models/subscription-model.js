const mongoose = require('mongoose');

const subscriptionModel = new mongoose.Schema({
    doctorId            : mongoose.Schema.Types.ObjectId,
    registerDate        : Date,
    plan                : String,
}, { collection: 'subscriptions' })
module.exports = Subscription = mongoose.model("subScriptionModel", subscriptionModel)