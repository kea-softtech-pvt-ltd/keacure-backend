const joi = require('joi')

const loginSchema = joi.object({
    mobile: joi.string().length(10).pattern(/^[0-9]+$/).required(),
})

const loginOtpSchema = joi.object({
    otp: joi.string().length(6).pattern(/^[0-9]+$/).required(),
})

const personalInfoSchema = joi.object({
    name: joi.string().min(3).max(30).required(),
    gender: joi.string().required(),
    address: joi.string().required(),
    personalEmail: joi.string().email().required(),
})

const educationalInfoSchema = joi.object({
    doctorId:joi.required(),
    specialization: joi.array().required(),
    collage: joi.string().min(3).required(),
    comYear: joi.string().pattern(/^[0-9]+$/).required(),
    degree: joi.string().min(3).required(),
})

const experienceInfoSchema = joi.object({
    doctorId:joi.required(),
    clinicName: joi.string().min(3).required(),
    startYear: joi.string().required(),
    endYear: joi.string().required(),
    description: joi.string().min(3).required(),
})

const clinicInfoSchema = joi.object({
    doctorId:joi.required(),
    clinicName: joi.string().min(3).required(),
    specialization: joi.array().required(),
    address: joi.string().min(3).required(),
    services: joi.array().required(),
    clinicNumber: joi.string().min(3).pattern(/^[0-9]+$/).required(),
})

const ownClinicInfoSchema = joi.object({
    doctorId:joi.required(),
    clinicName: joi.string().min(3).required(),
    specialization: joi.array().required(),
    address: joi.string().min(3).required(),
    services: joi.array().required(),
    clinicNumber: joi.string().min(3).pattern(/^[0-9]+$/).required(),
})

module.exports = {
    loginSchema,
    //loginOtpSchema,
    personalInfoSchema,
    educationalInfoSchema,
    experienceInfoSchema,
    clinicInfoSchema,
    ownClinicInfoSchema
}
