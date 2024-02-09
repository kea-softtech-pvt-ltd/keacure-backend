const DoctorEducation = require('../models/doctorEducation');

module.exports = {
  async fetchEducationData(req, res, next) {
    await DoctorEducation.find({ doctorId: req.params.doctorId }, function (err, doc) {
      res.send(doc);
    })
  },

  //for fe  tching doctor info
  async fetchAllEducationData(req, res, next) {
    await DoctorEducation.find()
      .then(education => res.json(education))
  },

  async fetchAllEditEducationData(req, res, next) {
    await DoctorEducation.findById(req.params.id, function (err, doc) {
      res.send(doc);
    })
  },


  //for add data
  async allEducationData(req, res, next) {
    const educationData = new DoctorEducation({
      doctorId: req.body.doctorId,
      specialization: req.body.specialization,
      collage: req.body.collage,
      comYear: req.body.comYear,
      degree: req.body.degree,
    })
    educationData.save();
    if (res) {
      return res.json(educationData)
    }
  },

  //for update data
  async allUpdateEducationData(req, res, next) {
    await DoctorEducation.findById(req.params.id, function (err, doc) {
      DoctorEducation.findByIdAndUpdate({ _id: req.params.id }, {
        doctorId: req.body.doctorId,
        specialization: req.body.specialization,
        collage: req.body.collage,
        comYear: req.body.comYear,
        degree: req.body.degree,
      }, { new: true }, function (err, data) {
        if (err) {
          res.json(err);
        }
        else {
          res.json(data);
        }
      });
    })
  },

  //for delete document
  async deleteEducationData(req, res, next) {
    const id = req.params.id;
    await DoctorEducation.findByIdAndUpdate({ _id: req.params.id }, {
      document: req.body.document
    }, function (err, data) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(data);
      }
    });
  },
  async deleteEducationById(req, res) {
    await DoctorEducation.findByIdAndRemove({ _id: req.params.id }, function (err, doc) {
      res.send(doc)
    })
  }
}