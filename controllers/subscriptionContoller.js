const features_master = require('../models/features_master');
const subscriptionModel = require('../models/subscription-model');
const subscriptionPlans = require('../models/subscription_master');
const doctorLogin = require('../models/doctorprofile')
const moment = require("moment")

module.exports = {
   // for doctor
    async addSubscription(req, res, next) {
        var date = moment(req.body.date).format("YYYY-MM-DD");
        var days = req.body.duration
        var currentDate = moment(date);
        var expirydate = moment(currentDate).add(days, 'd');
        const data = new subscriptionModel({
            doctorId        : req.body.doctorId,
            registerDate    : currentDate,
            expiryDate      : expirydate,
            selected_plan   : req.body.plan,
            duration        : req.body.duration,
            Status          : req.body.status
        })
        await data.save();
        doctorLogin.findOneAndUpdate(
            { _id: req.body.doctorId },
            { isSubscribed: true },
            function (error, success) {
                if (error) {
                    res.json({
                        "error": "I am error"
                    });
                } else {
                    res.json({
                        data,
                        isSubscribed: true
                    });
                }
            }
        );
    },

    async getSubscription(req, res) {
        await subscriptionModel.find({ doctorId: req.params.doctorId }, function (err, doc) {
            res.send(doc)
        })
    },

    async updateSubscription(req, res) {
        var date = moment(req.body.date).format("YYYY-MM-DD");
        var days = req.body.duration
        var currentDate = moment(date);
        var expirydate = moment(currentDate).add(days, 'd');
        const data = new subscriptionModel({
            doctorId        : req.body.doctorId,
            registerDate    : currentDate,
            expiryDate      : expirydate,
            selected_plan   : req.body.plan,
            duration        : req.body.duration,
            Status          : req.body.status
        })
        data.save();
        subscriptionModel.findOneAndUpdate(
            { _id: req.params.id },
            { Status: "Expired" },
            function (error, success) {
                if (error) {
                    res.json({
                        "error": "I am error"
                    });
                } else {
                    res.json({
                        data,
                        Status: "Expired"
                    });
                }
            }
        );
    },

    //for admin
    async getFeatures(req, res, next) {
        await features_master.find(function (err, docs) {
            res.send(docs)
        })
    },

    async addFeatures(req, res, next) {
        const data = new features_master({
            name: req.body.name,
        })
        data.save();
    },
    
    async addAdminSubscription(req, res, next) {
        const data = new subscriptionPlans({
            name        : req.body.name,
            frequency   : req.body.frequency,
            amount      : req.body.amount,
            features    : req.body.features,
            status      : req.body.status
        })
        data.save(data);
        res.json(data);
    },

    async updateAdminSubscription(req, res) {
        let data = {
            name        : req.body.name,
            frequency   : req.body.frequency,
            amount      : req.body.amount,
            features    : req.body.features,
            status      : req.body.status
        }
        await subscriptionPlans.findByIdAndUpdate({ _id: req.params.id }, data, {
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

    async getAdminSubscription(req, res, next) {
        await subscriptionPlans.find(function (err, docs) {
            res.send(docs)
        })
    },

    async deleteAdminSubscription(req, res) {
        await subscriptionPlans.findByIdAndRemove({ _id: req.params.id }, function (err, doc) {
            res.send(doc)
        })
    },

    async getSubscriptionPlanById(req, res, next) {
        await subscriptionPlans.find({ _id: req.params.id }, function (err, doc) {
            res.send(doc);
        })
    },
}