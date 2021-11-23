const PatientLogin = require('../models/patientProfile');

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
        const otp  = req.body.otp;
        const _id  = req.body._id;
        if(!otp ){
        return res.json({"status": {"error":"please fill the field properly"}});
        }
        try{
        const userExit = await PatientLogin.findOne({otp:otp},{_id:_id});
        if(userExit){
            PatientLogin.findByIdAndUpdate({_id:_id},{
                isLoggedIn: true
            }, {new: true}, function(err, data){
                if(err) {
                    res.json(err);
                } 
                else { 
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
    }
}