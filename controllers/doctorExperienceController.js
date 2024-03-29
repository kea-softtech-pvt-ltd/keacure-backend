const DoctorExperience = require('../models/doctorExperience');

module.exports = {
  //fetch data
  async fetchAllExperienceById(req, res, next) {
    await DoctorExperience.find({ doctorId: req.params.doctorId }, function (err, doc) {
      res.send(doc);
    })
  },

  //for fetching doctor info
  async fetchAllExperience(req, res, next) {
    await DoctorExperience.find()
      .then(experience => res.json(experience))
  },

  async fetchAllEditExperience(req, res, next) {
    await DoctorExperience.findById(req.params.id, function (err, doc) {
      res.send(doc);
    })
  },

  async allExperienceData(req, res, next) {
    const experienceData = new DoctorExperience({
      doctorId      : req.body.doctorId,
      clinicName    : req.body.clinicName,
      startYear     : req.body.startYear,
      endYear       : req.body.endYear,
      description   : req.body.description
    })
    experienceData.save();
    res.json(experienceData);
  },

  //for update data
  async allExperienceDataById(req, res, next) {
    DoctorExperience.findByIdAndUpdate({ _id: req.params.id }, {
      doctorId    : req.body.doctorId,
      clinicName  : req.body.clinicName,
      startYear   : req.body.startYear,
      endYear     : req.body.endYear,
      description : req.body.description
    }, { new: true }, function (err, data) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(data);
      }
    });
  },
  async deleteExperienceById(req, res){
    await DoctorExperience.findByIdAndRemove({_id:req.params.id}, function(err, doc){
      res.send(doc)
    })
  }
}
