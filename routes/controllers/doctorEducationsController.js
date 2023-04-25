const DoctorEducation      =  require('../models/doctorEducation');
const {educationalInfoSchema} = require('../auth/doctorSchemasValidate')
module.exports = {
  async fetchEducationData(req, res, next)  {
    await DoctorEducation.find({doctorId: req.params.id}, function (err, doc) {
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
    const result = await educationalInfoSchema.validateAsync(req.body)
    console.log("result-------", result) 
    const reqFiles = [];
    // for (var i = 0; i < req.files.length; i++) {
    //   reqFiles.push(req.files[i].filename)
    // }
    const educationData = new DoctorEducation({
      doctorId         : result.doctorId,
      specialization   : result.specialization,
      collage          : result.collage,
      comYear          : result.comYear,
      degree           : result.degree,
      //document         : reqFiles
    })
    educationData.save();
    if(res) {
      return res.json(educationData)
    }
  },

  //for update data
  async allUpdateEducationData(req, res, next) {  
    await DoctorEducation.findById(req.params.id, function (err, doc) {
      let reqFiles = [];
      reqFiles = doc.document
      // for (var i = 0; i < req.files.length; i++) {
      //     reqFiles.push(req.files[i].filename)
      // }
      DoctorEducation.findByIdAndUpdate({_id: req.params.id},{
        doctorId         : req.body.doctorId,
        specialization   : req.body.specialization,
        collage          : req.body.collage,
        comYear          : req.body.comYear,
        degree           : req.body.degree,
        document         : reqFiles
      },{ new: true }, function(err, data){
        if(err) {
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
    await DoctorEducation.findByIdAndUpdate({_id: req.params.id},{
      document        : req.body.document
    }, function(err, data){
      if(err) {
        res.json(err);
      } 
      else { 
        res.json(data);
      }
    });
  }
}