const mongoose = require('mongoose')

const helper = new mongoose.Schema({
    doctorId        : mongoose.Schema.Types.ObjectId,
    userName        : String,
    password        : String,
    access_module   : []
}, { collection: "helpers" })
module.exports = helper = mongoose.model("helper", helper)