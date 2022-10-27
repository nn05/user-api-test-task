const Validator = require('jsonschema').Validator
const mongoose = require('mongoose')

const { userValidateSchema, inquiryDetailsValidateSchema, userPatchSchema } = require('../schema/user.schema')

const validate = (userData) => {
    const validator = new Validator()
    validator.addSchema(inquiryDetailsValidateSchema, '/InquiryDetails');
    const result = validator.validate(userData, userValidateSchema)
    if (!result.valid) {
        // more correct error description
        const errors = result.errors.map( item => { 
            let message = item.message
            if(item.name === 'anyOf') {
                result.schema.anyOf.forEach( (subschema, index) => {
                    message = message.replace(`[subschema ${index}]`, subschema.required)
                })
            }
            return message
        })
        return {...result, errors}
    }
    return result
}

const validatePatch = (userData) => {
    const validator = new Validator()
    validator.addSchema(inquiryDetailsValidateSchema, '/InquiryDetails');
    const result = validator.validate(userData, userPatchSchema)
    return result
}

const validateUserId = (userId) => {
    try {
        new mongoose.Types.ObjectId(userId)
        return true
    }
    catch {
        return false
    }
}

exports.validateUser = validate
exports.validatePatchUser = validatePatch
exports.validateUserId = validateUserId