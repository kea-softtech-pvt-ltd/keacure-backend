const subscriptionModel = require('../routes/models/subscription-model')
const doctorLogin = require('../routes/models/doctorprofile')
const patientLogin = require('../routes/models/patientProfile')
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
    const data = await subscriptionModel.find({ doctorId: req.params.doctorId }, function (err, doc) {
        res.send()
    })

    const allSubData = data.filter((d) => {
        if (d.Status === "Running") {
            return data
        }
    })
    var expiryDate = moment(allSubData[0].expiryDate).format("YYYY-MM-DD");
    var newDate = moment(new Date()).format("YYYY-MM-DD");
    if (expiryDate < newDate) {
        const loginData = await doctorLogin.findByIdAndUpdate({ _id: req.params.doctorId }, {isSubscribed: false})
        const subscriptionData = await subscriptionModel.findByIdAndUpdate({ _id: allSubData[0]._id }, {Status: "Expired"})
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


// const isSubscriptionExpired = async (req, res, next) => {
//     await subscriptionModel.find({ doctorId: req.params.doctorId }, function (err, doc) {
//         const allSubData = doc.filter((d) => {
//             if (d.Status === "Running") {
//                 return doc
//             }
//         })

//         var expiryDate = moment(allSubData[0].expiryDate).format("YYYY-MM-DD");
//         var newDate = moment(new Date()).format("YYYY-MM-DD");
//         if (expiryDate < newDate) {
//             doctorLogin.findByIdAndUpdate(
//                 { _id: req.params.doctorId },
//                 { isSubscribed: false },
//                 function (error, success) {
//                     if (error) {
//                         res.json({
//                             "error": "I am error"
//                         });
//                     } else {
//                         res.json({
//                             doc,
//                             Status: "false"
//                         });
//                     }
//                 }
//             );
//         } else {
//             next()
//         }
//     })
// }
module.exports = {
    isDrLoggedIn,
    // isSubscriptionExpired,
    isSubscribed,
    isPatientLoggedIn
}