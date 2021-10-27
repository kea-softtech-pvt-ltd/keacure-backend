const DoctorDetail   =  require('../models/doctorprofile');
const doctorEducation = require('../models/doctorEducation');
const doctorExperience = require('../models/doctorExperience');
const clinicInfo = require('../models/clinicInfo');
const ownClinicInfo = require('../models/ownClinicInfo');
const setSession = require('../models/setSession');
const mongoose = require('mongoose');

//for insert mobile number and generate otp
module.exports = {
  async login(req, res, next) {
    const mobile    = req.body.mobile;
    const digits    = '0123456789';
    let otp = '';
    
    if(!mobile ){
      return res.status(422).json("please fill the field properly ");
    }
    await DoctorDetail.findOne({mobile:mobile}).then(user => {
      if(user) {
        if(user.isLoggedIn) {
          return {
            "message":"already logged in",
            "data": res.json(user)
          }
        } else {
          for(let i = 0; i < 6; i++) {
            otp += digits[Math.floor(Math.random() * 10)];
          }
          return {
            "message":"User found",
            "data": {...user, ...{otp: otp}}
          }
        }
      } else {
        for(let i = 0; i < 6; i++) {
          otp += digits[Math.floor(Math.random() * 10)];
        }
        const newDoctorData  = new DoctorDetail({
          mobile ,
          otp
        })
        newDoctorData.save()
        res.json(newDoctorData);
      }
    });
  },

  //for fetch otp
  async loginOtp(req, res, next) {  
    const otp  = req.body.otp;
    const _id  = req.body._id;
  
    if(!otp ){
      return res.json({"status": {"error":"please fill the field properly"}});
    }
    try{
    const userExit = await DoctorDetail.findOne({otp:otp},{_id:_id});
      if(userExit){ 
        DoctorDetail.findByIdAndUpdate({_id: _id},{
          isLoggedIn: true
        });
        return res.json(req.body);
      }else{
        return res.json({"status": {"error":"wrong otp"}})
      }
    }catch(err){
      console.log(err);
    }
  },

  async otpIsLoggedIn(req, res, next) { 
    await  DoctorDetail.findByIdAndUpdate({_id: req.params.id},{
      isLoggedIn     : req.body.isLoggedIn,
    }, function(err, data){
      if(err) {
          res.json(err);
      } 
      else { 
          res.json(data);
      }
    });
  },

  //fetchdata
  async fetchOtp(req, res, next) { 
    await DoctorDetail.find(function(err,docs) {
      res.send(docs)  
    })
  },

  async fetchDataById(req, res, next) { 
    await DoctorDetail.findById(req.params.id, function (err, doc) {
      res.send(doc);
    })
  },
  //for update data
  async insertPersonalInfoById(req, res, next) { 
    let data = []
    if(req.file) {
      data = {
        photo               : req.file.filename,
        name                : req.body.name,
        gender              : req.body.gender,
        address             : req.body.address,
        officialEmail       : req.body.officialEmail,
        personalEmail       : req.body.personalEmail,
      }
    } else {
      data = {
        name                : req.body.name,
        gender              : req.body.gender,
        address             : req.body.address,
        officialEmail       : req.body.officialEmail,
        personalEmail       : req.body.personalEmail,
      }
    }
    DoctorDetail.findByIdAndUpdate({_id: req.params.id},data, function(err, data){
      if(err) {
          res.json(err);
      } 
      else { 
          res.json(data);
      }
    });
  },

  async fetchAllDoctor(req, res, next) {   
    await DoctorDetail.aggregate([
    { 
      $lookup:{
          from: doctorEducation.collection.name,
          localField: "_id",
          foreignField: "doctorId",
          as: "educationList",
        }
      },
      {
        $lookup: {
          from: doctorExperience.collection.name,
          localField: "_id",
          foreignField: "doctorId",
          as:"experienceList"
        }
      }
    ])
    .exec( (err, result)=>{
      if(err) {
          res.send(err);
      } 
      if(result) { 
        res.send(result)
      }
    })
  },
  async fetchDoctorsById(req, res, next) {
    console.log(req.params)
    const id = mongoose.Types.ObjectId(req.params.id);
    await DoctorDetail.aggregate([
      { "$match": { "_id": id } },
      { 
        $lookup:{
          from: doctorEducation.collection.name,
          localField: "_id",
          foreignField: "doctorId",
          as: "educationList",
        }
      },
      {
        $lookup: {
          from: doctorExperience.collection.name,
          localField: "_id",
          foreignField: "doctorId",
          as:"experienceList"
        }
      },
      {
        $lookup: {
          from: clinicInfo.collection.name,
          localField: "_id",
          foreignField: "doctorId",
          as:"clinicList"
        }
      },
      {
        $lookup: {
          from: ownClinicInfo.collection.name,
          localField: "_id",
          foreignField: "doctorId",
          as:"ownClinicList"
        }
      },
      {
        $lookup: {
          from: setSession.collection.name,
          localField: "_id",
          foreignField: "doctorId",
          as:"session"
        }
      }
    ])
    .exec( (err, result)=>{
      if(err) {
        res.send(err);
      } 
      if(result) { 
        res.send(result)
      }
    })
  }
} 