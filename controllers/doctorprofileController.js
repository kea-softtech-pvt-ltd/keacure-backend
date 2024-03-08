const DoctorLogin = require('../models/doctorprofile');
const doctorEducation = require('../models/doctorEducation');
const doctorExperience = require('../models/doctorExperience');
const clinics = require('../models/clinic')
const setSession = require('../models/setSession');
const subScription = require('../models/subscription-model')
const jwt = require("jsonwebtoken");
const config = require("../auth/config")
const mongoose = require('mongoose');
const { getStorage } = require("firebase/storage");
const axios = require("axios");

const {
  loginSchema,
} = require('../auth/doctorSchemasValidate')

//for insert mobile number and generate otp
module.exports = {
  async login(req, res) {
    const result = await loginSchema.validateAsync(req.body)
    // const mobile = req.body.mobile;
    const digits = '0123456789';
    let otp = '';

    if (!result.mobile) {
      return res.status(422).json({ "status": { "error": "Please fill the field properly" } });
    }
    try {
      const userExit = await DoctorLogin.findOne({ mobile: result.mobile });
      if (userExit) {
        for (let i = 0; i < 6; i++) {
          otp += digits[Math.floor(Math.random() * 10)];
        }
        DoctorLogin.findByIdAndUpdate({ _id: userExit._id }, {
          otp: otp,
        }, { new: true }, function (err, data) {
          if (err) {
            res.json(err);
          }
          else {
            res.json(data);
          }
        })
      } else {
        for (let i = 0; i < 6; i++) {
          otp += digits[Math.floor(Math.random() * 10)];
        }
        const mobile = result.mobile
        const newUserData = new DoctorLogin({
          mobile,
          otp
        })
        await newUserData.save();
        res.json(newUserData);
      }
    } catch (err) {
      console.log(err);
    }
  },

  async resetOTP(req, res) {
    const _id = req.body._id;
    const digits = '0123456789';
    let otp = '';
    const userExit = await DoctorLogin.findOne({ _id: _id });
    if (userExit) {
      for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
      DoctorLogin.findByIdAndUpdate({ _id: userExit._id }, {
        otp: otp,
      }, { new: true }, function (err, data) {
        if (err) {
          res.json(err);
        }
        else {
          res.json(data);
        }
      })
    } else {
      for (let i = 0; i < 6; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
      }
      const newUserData = new DoctorLogin({
        otp
      })
      await newUserData.save();
      res.json(newUserData);
    }
  },

  //for fetch otp
  async loginOtp(req, res, next) {
    const { _id, getOTP } = req.body;
    // const  {otp} = await loginOtpSchema.validateAsync(req.body)
    if (!getOTP) {
      return res.json({ "status": { "error": "please fill the field properly" } });
    }
    try {
      const userExit = await DoctorLogin.findOne({ otp: getOTP }, { _id: _id });

      const accessToken = jwt.sign({ _id: _id }, config.secret, {
        expiresIn: config.jwtExpiration,
      });

      const refreshToken = DoctorLogin.createToken(userExit);
      if (userExit) {
        DoctorLogin.findByIdAndUpdate({ _id: _id }, {
          isLoggedIn: true,
          accessToken: accessToken,
          refreshToken: refreshToken,
          medicines_ID: `medicines_${_id}`
        }, { new: true }, function (err, data) {
          if (err) {
            res.json(err);
          }
          else {
            res.json(data);
          }
        })
      } else {
        res.json({ "status": { "error": "Please Enter Correct OTP" } })
      }
    } catch (err) {
      res.json({ "status": { "error": "Please Enter Correct OTP" } })
    }
    next()
  },

  async otpIsLoggedIn(req, res, next) {
    await DoctorLogin.findByIdAndUpdate({ _id: req.params.id }, {
      isLoggedIn: req.body.isLoggedIn,
    }, function (err, data) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(data);
      }
    });
  },

  //fetchdata
  async fetchOtp(req, res, next) {
    await DoctorLogin.find(function (err, docs) {
      res.send(docs)
    })
  },

  async fetchDataById(req, res, next) {
    await DoctorLogin.findById(req.params.doctorId, function (err, doc) {
      res.send(doc);
    })
  },
  //for update data
  async insertPersonalInfoById(req, res, next) {
    data = {
      photo: req.body.photo,
      name: req.body.name,
      gender: req.body.gender,
      address: req.body.address,
      personalEmail: req.body.personalEmail,
    }
    DoctorLogin.findByIdAndUpdate({ _id: req.params.doctorId }, data, function (err, data) {
      if (err) {
        res.json(err);
      }
      else {
        res.json(data);
      }
    });
  },

  async fetchAllDoctor(req, res, next) {
    const searchText = req.body.key ? req.body.key : "";
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 6;
    await DoctorLogin.aggregate([
      { "$match": { "name": { $regex: new RegExp(searchText), $options: 'i' } } },
      {
        $lookup: {
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
          as: "experienceList"
        }
      },
      {
        $lookup: {
          from: subScription.collection.name,
          localField: "_id",
          foreignField: "doctorId",
          as: "subscription"
        }
      }
    ])
      .exec(async (err, result) => {
        if (err) {
          res.send(err);
        }
        if (result) {
          const endIndex = page * pageSize
          const startIndex = endIndex - pageSize
          const doctorList = result.slice(startIndex, endIndex);
          const doctorListPages = Math.ceil(result.length / pageSize);
          res.send({ result, doctorList: doctorList, doctorListPages })
        }
      })
  },

  async fetchDoctorsById(req, res, next) {
    const id = mongoose.Types.ObjectId(req.params.doctorId);
    const page = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = req.query.pageSize ? parseInt(req.query.pageSize) : 6;
    await DoctorLogin.aggregate([
      { "$match": { "_id": id } },
      {
        $lookup: {
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
          as: "experienceList"
        }
      },
      {
        $lookup: {
          from: clinics.collection.name,
          localField: "clinics.id",
          foreignField: "_id",
          as: "clinicList"
        }
      },
      {
        $lookup: {
          from: setSession.collection.name,
          localField: "_id",
          foreignField: "doctorId",
          as: "session"
        }
      }
    ])
      .exec((err, result) => {
        if (err) {
          res.send(err);
        }
        if (result) {
          const endIndex = page * pageSize
          const startIndex = endIndex - pageSize
          const clinicList = result[0]['clinicList'].slice(startIndex, endIndex);
          const clinicListPages = Math.ceil(result[0]['clinicList'].length / pageSize);
          res.send({ result, clinicList: clinicList, clinicListPages })
        }
      })
  },

  async refreshJWTToken(req, res, next) {
    const _id = req.body._id;
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
  },

  // async sendSMS() {
  //   const result = await axios.create({
  //     baseURL: "https://api.textlocal.in/",
  //     params: {
  //       apiKey: "YBzNv++3trI-OjGn7uQnRiEfE6LmKaZ4JtriZ8MIvX", //Text local api key
  //       sender: "600010"
  //     }
  //   })

  //   const sendPartnerWelcomeMessage = () => {
  //     if ('8806971543' && 'shubhangi') {
  //       const params = new URLSearchParams();
  //       params.append("numbers", [parseInt("91" + "8806971543")]);
  //       params.append(
  //         "message",
  //         `Hi there,
  //           your one time OTP is 1234`
  //       );
  //       result
  //     }
  //   }
  //   return sendPartnerWelcomeMessage()
  // },
} 