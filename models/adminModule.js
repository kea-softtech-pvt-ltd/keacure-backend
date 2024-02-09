const mongoose = require('mongoose')

const adminmodule = new mongoose.Schema({
    username        : String,
    password        : String,
}, { collection: "admins" })
module.exports = Admin = mongoose.model("adminmodule", adminmodule)