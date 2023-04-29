const joi = require('joi')

const loginSchema = joi.object({
    mobile: joi.string().length(10).pattern(/^[0-9]+$/).required(),
})

const loginOtpSchema = joi.object({
    otp: joi.string().length(6).pattern(/^[0-9]+$/).required(),
})

const profileSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    gender: joi.string().required(),
    address: joi.string().required(),
    email: joi.string().email().required(),
    mobile: joi.string().email().required(),
    age: joi.string().email().required(),
    bloodgroup: joi.string().email().required(),
    height: joi.string().email().required(),
    weight: joi.string().email().required(),
    birthdate: joi.string().email().required(),
    maritalstatus: joi.string().email().required(),
})


module.exports = {
    loginSchema,
    //loginOtpSchema,
    profileSchema,
}
