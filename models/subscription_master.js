const mongoose = require('mongoose');

const subscriptionPlans = new mongoose.Schema({
    name     : String,
    frequency : Number,
    amount    : Number,
    features : [],
    status   : Boolean
},  {collection: 'subscriptionPlans_masters' });

module.exports = SubscriptionPlan = mongoose.model('subscriptionPlans', subscriptionPlans);