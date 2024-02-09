const mongoose = require('mongoose')

const accessmodules = new mongoose.Schema({
    module_name        : String,
    status        : Boolean,
}, { collection: "access_modules" })
module.exports = AccessModules = mongoose.model("accessmodules", accessmodules)