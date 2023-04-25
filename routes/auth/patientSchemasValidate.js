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
    personalEmail: joi.string().email().required(),
})

module.exports = {
    loginSchema,
    //loginOtpSchema,
    profileSchema,
}
