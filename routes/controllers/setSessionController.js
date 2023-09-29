const Session = require('../models/setSession');

module.exports = {
    async setSessionData(req, res, next) {
        const newSessionData = new Session({
            doctorId: req.body.doctorId,
            clinicId: req.body.clinicId,
            fromTime: req.body.fromTime,
            toTime: req.body.toTime,
            timeSlot: req.body.timeSlot,
            showSelectedSlots: req.body.showSelectedSlots,
            Appointment: req.body.Appointment,
            fees: req.body.fees,
            day: req.body.day
        })
        newSessionData.save();
        res.json(newSessionData);
    },

    //for update data
    async updateSessionData(req, res, next) {
        Session.findByIdAndUpdate({ _id: req.params.id },
            {
                $unset: { showSelectedSlots: [] }
            }).exec();
        Session.findByIdAndUpdate({ _id: req.params.id },
            {
                doctorId: req.body.doctorId,
                clinicId: req.body.clinicId,
                fromTime: req.body.fromTime,
                toTime: req.body.toTime,
                timeSlot: req.body.timeSlot,
                showSelectedSlots: req.body.showSelectedSlots,
                Appointment: req.body.Appointment,
                fees: req.body.fees,
                day: req.body.day
            },
            { new: true }, function (err, data) {
                if (err) {
                    res.json(err);
                }
                else {
                    res.json(data);
                }
            });
    },

    async fetchSetSessionData(req, res, next) {
        await Session.find({_id: req.params.id }, function (err, doc) {
            res.send(doc);
        })
    },

    async fetchSessionData(req, res, next) {
        await Session.find({ doctorId: req.body.doctorId, clinicId: req.body.clinicId,  isDeleted:req.body.isDeleted }, function (err, doc) {
            res.send(doc);
        })
    },

    async deleteSessionData(req, res) {
        await Session.findByIdAndUpdate(req.params.id, { isDeleted: true , deletedAt:new Date()});
        res.status(200).json('user Deleted');
    },

    async getDaysSlots(req, res, next) {
        await Session.findOne({ doctorId: req.body.doctorId, clinicId: req.body.clinicId, day: req.body.day, Appointment: req.body.Appointment }, function (err, doc) {
            res.send(doc);
        })
    },

    async getSessionDataById(req, res, next) {
        await Session.find({ doctorId: req.params.doctorId, clinicId: req.params.clinicId }, function (err, doc) {
            res.send(doc);
        })
    },

    async fetchSessionDataById(req, res, next) {
        Session.find({ doctorId: req.params.id })
            .then(clinic => res.json(clinic))
    }
}