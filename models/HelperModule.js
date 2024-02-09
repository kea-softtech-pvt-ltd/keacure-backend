const { date } = require('joi')
const mongoose = require('mongoose')

const helper = new mongoose.Schema({
    doctorId        : mongoose.Schema.Types.ObjectId,
    username        : String,
    password        : String,
    email           : String,
    mobile          : String,
    access_module   : [],
    isDeleted       : {
                        type: Boolean,
                        default: false
                      },
    deletedAt       : String

}, { collection: "helpers" })
module.exports = Helper = mongoose.model("helper", helper)