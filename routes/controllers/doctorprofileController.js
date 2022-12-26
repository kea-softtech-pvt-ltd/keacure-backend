const DoctorLogin   =  require('../models/doctorprofile');
const doctorEducation = require('../models/doctorEducation');
const doctorExperience = require('../models/doctorExperience');
const clinicInfo = require('../models/clinicInfo');
const ownClinicInfo = require('../models/ownClinicInfo');
const setSession = require('../models/setSession');
const jwt = require("jsonwebtoken");
const config = require("../auth/config")
const mongoose = require('mongoose');

//for insert mobile number and generate otp
module.exports = {
  async login(req,res,next){    
    const mobile    = req.body.mobile;
    const digits    = '0123456789';
    let otp = '';
    
    if(!mobile){
        return res.status(422).json({"status": {"error":"Please fill the field properly"}});
    }
    try{
        const userExit = await  DoctorLogin.findOne({mobile:mobile});
        if(userExit){
            for(let i = 0; i < 6; i++) {
                otp += digits[Math.floor(Math.random() * 10)];
            }
            DoctorLogin.findByIdAndUpdate({_id: userExit._id},{
                otp     : otp,
            }, {new: true}, function(err, data){
                if(err) {
                    res.json(err);
                } 
                else { 
                    res.json(data);
                }
            })
        } else {
            for(let i = 0; i < 6; i++) {
                otp += digits[Math.floor(Math.random() * 10)];
            }
            const newUserData    = new  DoctorLogin({
                mobile,
                otp
            })
            await newUserData.save();
            res.json(newUserData);
        }
    }catch(err){
        console.log(err);
    }
  },

  //for fetch otp
  async loginOtp(req,res,next){    
    const {otp , _id}  = req.body;
    if(!otp ){
        return res.json({"status": {"error":"please fill the field properly"}});
    }
    try{
        const userExit = await DoctorLogin.findOne({otp:otp},{_id:_id});
        const accessToken = jwt.sign({ id: _id }, config.secret, {
            expiresIn: config.jwtExpiration,
        });
        const refreshToken = DoctorLogin.createToken(userExit);

        if(userExit){
          DoctorLogin.findByIdAndUpdate({_id:_id},{
            isLoggedIn: true,
            accessToken: accessToken,
            refreshToken: refreshToken,
          }, {new: true}, function(err, data){
            if(err) {
                res.json(err);
            } 
            else{ 
                res.json(data);
            }
          })
        }else{
          return res.json({"status": {"error":"Please Enter Correct OTP"}})
        }
    }catch(err){
        console.log(err);
    }
  },

  async otpIsLoggedIn(req, res, next) { 
    await  DoctorLogin.findByIdAndUpdate({_id: req.params.id},{
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
    await DoctorLogin.find(function(err,docs) {
      res.send(docs)  
    })
  },

  async fetchDataById(req, res, next) { 
    await DoctorLogin.findById(req.params.id, function (err, doc) {
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
        personalEmail       : req.body.personalEmail
      }
    }
    DoctorLogin.findByIdAndUpdate({_id: req.params.id},data, function(err, data){
      if(err) {
        res.json(err);
      } 
      else { 
          res.json(data);
      }
    });
  },

  
  async fetchAllDoctor(req, res, next) {   
    await DoctorLogin.aggregate([
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
    const id = mongoose.Types.ObjectId(req.params.id);
    await DoctorLogin.aggregate([
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
  },

  async refreshJWTToken(req, res, next) {
    const _id  = req.body._id;
    const { refreshToken: requestToken } = req.body;

    if (requestToken == null) {
      return res.status(403).json({ message: "Refresh Token is required!" });
    }
  
    try {
      let refreshToken = await DoctorLogin.findOne({ token: requestToken });
      if (!refreshToken) {
        res.status(403).json({ message: "Refresh token is not in database!" });
        return;
      }
  
      if (DoctorLogin.verifyExpiration(refreshToken)) {
        DoctorLogin.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
        
        res.status(403).json({
          message: "Refresh token was expired. Please make a new signin request",
        });
        return;
      }
  
      let newAccessToken = jwt.sign({ id: refreshToken.user._id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });
  
      return res.status(200).json({
        accessToken: newAccessToken,
        refreshToken: refreshToken.token,
      });
    } catch (err) {
      return res.status(500).send({ message: err });
    }
  }
} 