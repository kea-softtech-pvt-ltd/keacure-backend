const HelperModel = require('../models/HelperModule');
const AccessModules = require('../models/accessModule')
module.exports = {
    async AddHelper(req, res, next) {
        const newUserData = new HelperModel({
            doctorId    : req.body.doctorId,
            username: req.body.username,
            password: req.body.password,
            access_Model: req.body.access_Model
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
            res.status(400).json("invalid credentials");
        } else {
            res.json("user login successfully");
        }
    },

    async GetAccessModule(req, res, next) {
        await AccessModules.find(function (err, docs) {
            res.send(docs)
        })
    },
}