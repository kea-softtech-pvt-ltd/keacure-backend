const subscriptionModel = require('../models/subscription-model')
const doctorLogin = require('../models/doctorprofile')
const patientLogin = require('../models/patientProfile')
const moment = require("moment");

const isDrLoggedIn = async (req, res, next) => {
    await doctorLogin.findById(req.params.doctorId, function (err, doc) {
        if (doc.isLoggedIn === true) {
            next()
        } else {
            res.send("please loggedIn")
        }
    })
}

const isSubscribed = async (req, res, next) => {
    const data = await subscriptionModel.find({ doctorId: req.params.doctorId })

    const allSubData = data.filter((d) => {
        if (d.Status === "Running") {
            return data
        }
    })
    if (allSubData[0] ) {
        var expiryDate = moment(allSubData[0].expiryDate).format("YYYY-MM-DD");
        var newDate = moment(new Date()).format("YYYY-MM-DD");
        if (expiryDate < newDate) {
            const loginData = await doctorLogin.findByIdAndUpdate({ _id: req.params.doctorId }, { isSubscribed: false })
            const subscriptionData = await subscriptionModel.findByIdAndUpdate({ _id: allSubData[0]._id }, { Status: "Expired" })
            res.json({
                "status": "success",
                "data": {
                    data,
                    loginData,
                    subscriptionData
                }
            })
        } else {
            next()
        }
    }else{
        res.json({"status":"error"})
    }
}

const isPatientLoggedIn = async (req, res, next) => {
    await patientLogin.findById(req.params.patientId, function (err, doc) {
        if (doc.isLoggedIn === true) {
            next()
        } else {
            res.send("please loggedIn")
        }
    })
}

module.exports = {
    isDrLoggedIn,
    isSubscribed,
    isPatientLoggedIn
}