const mongoose = require('mongoose')

const helper = new mongoose.Schema({
    doctorId        : mongoose.Schema.Types.ObjectId,
    username        : String,
    password        : String,
    access_module   : []
}, { collection: "helpers" })
module.exports = Helper = mongoose.model("helper", helper)