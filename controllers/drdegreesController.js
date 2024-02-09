const Degrees = require('../models/drdegrees_master');

module.exports = {
    async getAllDegrees(req, res, next) {
        await Degrees.find()
            .then(degrees => res.json(degrees))
    }
}    