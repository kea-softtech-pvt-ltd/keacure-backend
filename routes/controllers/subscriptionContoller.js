const features_master = require('../models/features_master');
const subscriptionModel = require('../models/subscription-model');
const subscriptionPlans = require('../models/subscription_master');
const doctorLogin = require('../models/doctorprofile')
const moment = require("moment");

module.exports = {
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

    async addSubscription(req, res, next) {
        var date = moment(req.body.date).format("YYYY-MM-DD");
        var days = req.body.duration
        var currentDate = moment(date);
        var expirydate = moment(currentDate).add(days, 'd');
        const data = new subscriptionModel({
            doctorId: req.body.doctorId,
            registerDate: currentDate,
            expiryDate: expirydate,
            selected_plan: req.body.plan,
            duration: req.body.duration,
            isSubscribe: true
        })
        data.save();
        // doctorLogin.findOneAndUpdate(
        //     { _id: req.body.doctorId },
        //     { $push: { isSubscribed : true } },{ new: true },
        //     function (error, success) {
        //         if (error) {
        //             console.log(error);
        //         } else {
        //          console.log(success);
        //         }
        //     }
        // );
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
            expiryDate: req.body.expiryDate,
            selected_plan: req.body.plan,
            duration: req.body.duration,
            isSubscribe: true
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
            frequency: req.body.frequency,
            amount: req.body.amount,
            features: req.body.features,
            status: req.body.status
        })
        data.save(data);
        res.json(data);
    },

    async updateAdminSubscription(req, res) {
        let data = {
            name: req.body.name,
            frequency: req.body.frequency,
            amount: req.body.amount,
            features: req.body.features,
            status: req.body.status
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

    async getSubscriptionById(req, res, next) {
        await subscriptionPlans.find({ _id: req.params.id }, function (err, doc) {
            res.send(doc);
        })
    },

    // async getPlans(req, res) {
    //     var instance = new Razorpay({ key_id: 'rzp_test_04fVmhH2YBTTFq', key_secret: 'mPKGvp4WzMxjU1oFYIbOKYti' })
    //     const params = {
    //         "entity": "collection",
    //         "count": 2,
    //         "items": [
    //             {
    //                 "id": "plan_MlF6MtyPdI3jvH",
    //                 "entity": "plan",
    //                 "interval": 1,
    //                 "period": "monthly",
    //                 "item": {
    //                     "id": "item_00000000000005",
    //                     "active": true,
    //                     "name": "silver",
    //                     "description": "Description for the test plan - Monthly",
    //                     "amount": 2000,
    //                     "unit_amount": 2000,
    //                     "currency": "INR",
    //                     "type": "plan",
    //                     "unit": null,
    //                     "tax_inclusive": false,
    //                     "hsn_code": null,
    //                     "sac_code": null,
    //                     "tax_rate": null,
    //                     "tax_id": null,
    //                     "tax_group_id": null,
    //                     "created_at": 1580220461,
    //                     "updated_at": 1580220481
    //                 },
    //                 "notes": {
    //                     "notes_key_1": "Tea, Earl Grey, Hot",
    //                     "notes_key_2": "Tea, Earl Grey… decaf."
    //                 },
    //                 "created_at": 1580220481
    //             },
    //             {
    //                 "id": "plan_MlF9k8sP4cgN5K",
    //                 "entity": "plan",
    //                 "interval": 1,
    //                 "period": "yearly",
    //                 "item": {
    //                     "id": "item_00000000000002",
    //                     "active": true,
    //                     "name": "gold-6 month",
    //                     "description": null,
    //                     "amount": 12000,
    //                     "unit_amount": 12000,
    //                     "currency": "INR",
    //                     "type": "plan",
    //                     "unit": null,
    //                     "tax_inclusive": false,
    //                     "hsn_code": null,
    //                     "sac_code": null,
    //                     "tax_rate": null,
    //                     "tax_id": null,
    //                     "tax_group_id": null,
    //                     "created_at": 1580220493,
    //                     "updated_at": 1580220493
    //                 },
    //                 "notes": [

    //                 ],
    //                 "created_at": 1580220493
    //             }
    //         ]
    //     }
    //     const details = await instance.plans.all(params)
    //     res.send(details)
    //     console.log("=========", details)
    // },

    // async getSubscriptions(req, res) {
    //     var instance = new Razorpay({ key_id: 'rzp_test_04fVmhH2YBTTFq', key_secret: 'mPKGvp4WzMxjU1oFYIbOKYti' })
    //     const params = {
    //         "entity": "collection",
    //         "count": 2,
    //         "items": [
    //             {
    //                 "id": "sub_MpblPkt1d3zeVq",
    //                 "entity": "subscription",
    //                 "plan_id": "plan_MlF6MtyPdI3jvH",
    //                 "customer_id": "cust_D00000000000006",
    //                 "status": "active",
    //                 "current_start": 1577355873,
    //                 "current_end": 1582655401,
    //                 "ended_at": null,
    //                 "quantity": 1,
    //                 "notes": {
    //                     "notes_key_1": "Tea, Earl Grey, Hot",
    //                     "notes_key_2": "Tea, Earl Grey… decaf."
    //                 },
    //                 "charge_at": 1577385995,
    //                 "offer_id": "offer_JHD834hjbxzhd38d",
    //                 "start_at": 1577385995,
    //                 "end_at": 1603737004,
    //                 "auth_attempts": 0,
    //                 "total_count": 6,
    //                 "paid_count": 1,
    //                 "customer_notify": true,
    //                 "created_at": 1577356088,
    //                 "expire_by": 1577485999,
    //                 "short_url": "https://rzp.io/i/QnnhlL5u0D",
    //                 "has_scheduled_changes": false,
    //                 "change_scheduled_at": null,
    //                 "remaining_count": 5
    //             },
    //             {
    //                 "id": "sub_00000000000006",
    //                 "entity": "subscription",
    //                 "plan_id": "plan_00000000000009",
    //                 "customer_id": "cust_D00000000000005",
    //                 "status": "active",
    //                 "current_start": 1577355875,
    //                 "current_end": 1577355875,
    //                 "ended_at": null,
    //                 "quantity": 1,
    //                 "notes": {
    //                     "notes_key_1": "Tea, Earl Grey, Hot",
    //                     "notes_key_2": "Tea, Earl Grey… decaf."
    //                 },
    //                 "charge_at": 1561852802,
    //                 "start_at": 1561852802,
    //                 "end_at": 1590777006,
    //                 "auth_attempts": 0,
    //                 "total_count": 12,
    //                 "paid_count": 1,
    //                 "customer_notify": true,
    //                 "created_at": 1560241237,
    //                 "expire_by": 1561939197,
    //                 "short_url": "https://rzp.io/i/m0y0f",
    //                 "has_scheduled_changes": false,
    //                 "change_scheduled_at": null,
    //                 "source": "api",
    //                 "offer_id": "offer_JHD834hjbxzhd38d",
    //                 "remaining_count": 11
    //             }
    //         ]
    //     }
    //     const details = await instance.subscriptions.create(params)
    //     res.send(details)
    //     console.log("=========", details)
    // },
}