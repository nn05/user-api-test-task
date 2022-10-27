const userValidateSchema = {
    id: '/User',
    type: 'object',
    properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        homePhone: { type: 'string' },
        inquiryDetails: '/InquiryDetails',
        interests: {
            type: 'array',
            items: { type: 'string' }
        },
        isArchived: { type: 'boolean' },
        isSpam: { type: 'boolean' }
    },
    required: ['firstName', 'lastName'],
    anyOf: [
        { required: ['email'] },
        { required: ['homePhone'] }
    ],
    additionalProperties: false
}
const userPatchSchema = {
    id: '/User',
    type: 'object',
    properties: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        email: { type: 'string' },
        homePhone: { type: 'string' },
        inquiryDetails: '/InquiryDetails',
        interests: {
            type: 'array',
            items: { type: 'string' }
        },
        isArchived: { type: 'boolean' },
        isSpam: { type: 'boolean' }
    },
    additionalProperties: false
}

const inquiryDetailsValidateSchema = {
    id: '/InquiryDetails',
    type: 'object'
}

exports.userValidateSchema = userValidateSchema
exports.userPatchSchema = userPatchSchema
exports.inquiryDetailsValidateSchema = inquiryDetailsValidateSchema