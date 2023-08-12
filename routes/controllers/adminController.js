const AdminModel = require('../models/adminModule');
module.exports = {
    async loginAdmin(req, res, next) {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({ error: "please fill the data" })
        }
        const userLogin = await AdminModel.findOne({ username: username, password: password });
        if (!userLogin) {
            res.json(userLogin);
        } else {
            res.json(userLogin);
            return userLogin
        }
    }
}