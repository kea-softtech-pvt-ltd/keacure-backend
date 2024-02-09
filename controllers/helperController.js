const HelperModel = require('../models/HelperModule');
const AccessModules = require('../models/accessModule')

module.exports = {
    async AddHelper(req, res, next) {
        const newUserData = new HelperModel({
            doctorId: req.body.doctorId,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            mobile: req.body.mobile,
            access_module: req.body.access_module
        })
        await newUserData.save();
        res.json(newUserData);
    },

    async editHelper(req, res) {
        const newHelperData = {
            doctorId: req.body.doctorId,
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            mobile: req.body.mobile,
            access_module: req.body.access_module
        }
        await HelperModel.findByIdAndUpdate({ _id: req.params.id }, newHelperData, function (err, editHelper) {
            if (err) {
                res.json(err)
            } else {
                res.json(editHelper)
            }
        })
    },

    async HelperLogin(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "please fill the data" })
        }
        const userLogin = await HelperModel.findOne({ username: username, password: password });
        if (!userLogin) {
            res.json(userLogin);
        } else {
            res.json(userLogin);
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
    },

    async fetchHelper(req, res) {
        await HelperModel.find({ _id: req.params.id }, function (err, data) {
            res.send(data)
        })
    },

    async deleteHelper(req, res) {
        await HelperModel.findByIdAndUpdate({ _id: req.params.id }, { isDeleted: true, deletedAt: new Date() }, function (err, doc) {
            res.send(doc)
        })
    }
}