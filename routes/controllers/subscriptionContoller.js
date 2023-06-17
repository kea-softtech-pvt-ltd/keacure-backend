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

    async getSubscription(req, res) {
        await subscriptionModel.find({doctorId:req.params.doctorId}, function (err, doc) {
            res.send(doc)
        })
    },
    
    async updateSubscription(req, res) {
       let data = {
            doctorId: req.body.doctorId,
            registerDate: req.body.date,
            selected_plan: req.body.plan,
        }
        await subscriptionModel.findByIdAndUpdate({ _id: req.params.id }, data, {
            new: true
        }, function (err, data) {
            if (err) {
                res.json(err)
            }
            else {
                res.json(data)
            }

        })
    }

}