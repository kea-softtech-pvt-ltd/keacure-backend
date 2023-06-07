const subscriptionModel = require('../models/subscription-model');

module.exports = {
    async addSubscription(req, res, next) {
        const data = new subscriptionModel({
            doctorId: req.body.doctorId,
            registerDate: req.body.date,
            selected_plan: req.body.plan
        })
        data.save();
        res.json(data);
    },
}