const subscriptionModel = require('../models/subscription-model');
const subscriptionPlans = require('../models/subscription_master')
module.exports = {
    async addSubscription(req, res, next) {
        const data = new subscriptionModel({
            doctorId: req.body.doctorId,
            registerDate: req.body.date,
            selected_plan: req.body.plan,
            isSubscribe : true
        })
        data.save();
        res.json(data);
    },

    async getSubscription(req, res) {
        await subscriptionModel.find({ doctorId: req.params.doctorId }, function (err, doc) {
            res.send(doc)
        })
    },

    async updateSubscription(req, res) {
        let data = {
            doctorId: req.body.doctorId,
            registerDate: req.body.date,
            selected_plan: req.body.plan,
            isSubscribe : true
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
    },

    //for admin
    async addAdminSubscription(req, res, next) {
        const data = new subscriptionPlans({
            name: req.body.name,
            duration: req.body.duration,
            features: req.body.features,
            status : req.body.status
        })
        console.log("==========", data)
        data.save(data);
        res.json(data);
    },

    async getAdminSubscription(req, res, next) {
        await subscriptionPlans.find(function (err, docs) {
          res.send(docs)
        })
    },

}