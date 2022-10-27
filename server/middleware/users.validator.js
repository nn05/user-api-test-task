const Validator = require('jsonschema').Validator
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

exports.validateUser = validate
exports.validatePatchUser = validatePatch
