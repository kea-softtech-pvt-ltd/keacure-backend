const PatientLifestyle = require('../models/patientLifestyle')

module.exports = {
  //fetch inserted data
  async getPatientLifestyleData(req ,res,next){
    await PatientLifestyle.find({patientId:req.params.patientId}, function (err, doc) {
      res.send(doc);
    })
  },

  //insert data
  async allPatientLifestyleData(req,res,next)  {  
    const lifestyleData    =    new PatientLifestyle({
      patientId          : req.body.patientId,
      smokingHabits      : req.body.smokingHabits,
      activityLevel      : req.body.activityLevel,
      alcoholConsumption : req.body.alcoholConsumption,
      foodPreferences    : req.body.foodPreferences,
      occupation         : req.body.occupation,
    })
    await lifestyleData.save();
    res.json(lifestyleData);
  },

  //update inserted data
  async updatePatientLifestyleData(req ,res ,next) {
    PatientLifestyle.findByIdAndUpdate(req.params.id,{
      patientId          : req.body.patientId,
      smokingHabits      : req.body.smokingHabits,
      activityLevel      : req.body.activityLevel,
      alcoholConsumption : req.body.alcoholConsumption,
      foodPreferences    : req.body.foodPreferences,
      occupation         : req.body.occupation,
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
    await PatientLifestyle.findById(req.params.id, function (err, doc) {
      res.send(doc);
    })
  }
}