const mongoose = require('mongoose');

const subscriptionPlans = new mongoose.Schema({
    name     : String,
    duration : String,
    features : [],
    status   : Boolean
},  {collection: 'subscriptionPlans_masters' });

module.exports = SubscriptionPlan = mongoose.model('subscriptionPlans', subscriptionPlans);