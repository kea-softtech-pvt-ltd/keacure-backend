const PatientLogin = require('../models/patientProfile');
const jwt = require("jsonwebtoken");
const config = require("../auth/config")
const Razorpay = require('razorpay');

module.exports = {
    //for fetch otp
    async fetchAllPatient(req,res,next){    
        await PatientLogin.find(function(err,docs) {
        res.send(docs)  
        })
    },

    async PatientLogin(req,res,next){    
        const mobile    = req.body.mobile;
        const digits    = '0123456789';
        let otp = '';
        
        if(!mobile){
            return res.status(422).json({"status": {"error":"Please fill the field properly"}});
        }
        try{
            const userExit = await  PatientLogin.findOne({mobile:mobile});
            if(userExit){
                for(let i = 0; i < 6; i++) {
                    otp += digits[Math.floor(Math.random() * 10)];
                }
                PatientLogin.findByIdAndUpdate({_id: userExit._id},{
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
                const newUserData    = new  PatientLogin({
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
    
    async getPatientOtp(req,res,next){    
        const {otp , _id}  = req.body;
        if(!otp ){
            return res.json({"status": {"error":"please fill the field properly"}});
        }
        try{
            const userExit = await PatientLogin.findOne({otp:otp},{_id:_id});
            const accessToken = jwt.sign({ id: _id }, config.secret, {
                expiresIn: config.jwtExpiration,
            });
            const refreshToken = PatientLogin.createToken(userExit);

            if(userExit){
                PatientLogin.findByIdAndUpdate({_id:_id},{
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

    async insertPatientDetails(req,res,next){
        let data=[]
        if (req.file){
            data={
                photo         : req.file.filename,    
                name          : req.body.name,
                email         : req.body.email,
                gender        : req.body.gender,
                mobile        : req.body.mobile,
                age           : req.body.age,
                bloodgroup    : req.body.bloodgroup,
                maritalstatus : req.body.maritalstatus,
                height        : req.body.height,
                weight        : req.body.weight,
                birthdate     : req.body.birthdate,
                emcontact     : req.body.emcontact,
                address       : req.body.address,
            }
        }else{
            data={
                name          : req.body.name,
                email         : req.body.email,
                gender        : req.body.gender,
                mobile        : req.body.mobile,
                age           : req.body.age,
                bloodgroup    : req.body.bloodgroup,
                maritalstatus : req.body.maritalstatus,
                height        : req.body.height,
                weight        : req.body.weight,
                birthdate     : req.body.birthdate,
                emcontact     : req.body.emcontact,
                address       : req.body.address,
            }
        }
        await PatientLogin.findByIdAndUpdate({_id: req.params.id},data, {
            new: true
          }, function(err, data){
            if(err) {
                res.json(err);
            } 
            else { 
                res.json(data);
            }
        });
    },

    async otpIsLoggedIn(req, res, next) { 
        await PatientLogin.findByIdAndUpdate({_id: req.params.id},{
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

    //for fetching patient info
    async allPatient(req,res,next){
        await PatientLogin.find()
        .then(foundHome => res.json(foundHome))
    },

    async fetchPatientById(req, res, next) {
        await PatientLogin.findById(req.params.id, function (err, doc) {
            console.log(doc)
          res.send(doc);
        })
    },

    async refreshJWTToken(req, res, next) {
        const _id  = req.body._id;
        const { refreshToken: requestToken } = req.body;

        if (requestToken == null) {
          return res.status(403).json({ message: "Refresh Token is required!" });
        }
      
        try {
          let refreshToken = await PatientLogin.findOne({ token: requestToken });
      
          if (!refreshToken) {
            res.status(403).json({ message: "Refresh token is not in database!" });
            return;
          }
      
          if (PatientLogin.verifyExpiration(refreshToken)) {
            PatientLogin.findByIdAndRemove(refreshToken._id, { useFindAndModify: false }).exec();
            
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