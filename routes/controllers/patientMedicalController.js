const PatientMedical = require('../models/patientMedicalInfo')

module.exports = {
  //fetch inserted data
  async getPatientMedicalData(req ,res,next){
    await PatientMedical.find({patientId:req.params.patientId}, function (err, doc) {
      res.send(doc);
    })
  },

  //insert data
  async allPatientMedicalData(req,res,next)  {  
    const medicalData    =    new PatientMedical({
      patientId      : req.body.patientId,
      allergies      : req.body.allergies,
      cmedication    : req.body.cmedication,
      pmedication    : req.body.pmedication,
      diseases       : req.body.diseases,
      injuries       : req.body.injuries,
      surgeries      : req.body.surgeries
    })
    await medicalData.save();
  },

  //update inserted data
  async updatePatientMedicalData(req ,res ,next) {
    await PatientMedical.findByIdAndUpdate(req.params.id,{
      patientId      : req.body.patientId,
      allergies      : req.body.allergies,
      cmedication    : req.body.cmedication,
      pmedication    : req.body.pmedication,
      diseases       : req.body.diseases,
      injuries       : req.body.injuries,
      surgeries      : req.body.surgeries
    },{ new: true }, function(err, data){
        if(err) {
          res.json(err);
        } 
        else { 
          res.json(data);
        }
    });
  },

  //fetch updated data
  
  async fetchUpdatedPatientData(req ,res ,next) {
    await PatientMedical.findById(req.params.id, function (err, doc) {
      res.send(doc);
    })
  }
}