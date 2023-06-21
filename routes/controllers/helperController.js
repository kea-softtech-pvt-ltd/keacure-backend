const HelperModel = require('../models/HelperModule');
const AccessModules = require('../models/accessModule')
module.exports = {
    async AddHelper(req, res, next) {
        const newUserData = new HelperModel({
            doctorId: req.body.doctorId,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            access_module: req.body.access_module
        })
        await newUserData.save();
        res.json(newUserData);
    },

    async HelperLogin(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "please fill the data" })
        }
        const userLogin = await HelperModel.findOne({ username: username, password: password });
        if (!userLogin) {
            res.json(userLogin);
            res.json("incorrect data")
        } else {
            res.json(userLogin);
            res.json("login successfully")
            return userLogin
        }
    },

    async GetAccessModule(req, res, next) {
        await AccessModules.find(function (err, docs) {
            res.send(docs)
        })
    },

    async getHelper(req, res) {
        await HelperModel.find({ doctorId: req.params.doctorId }, function (err, doc) {
            res.send(doc)
        })
    }
}