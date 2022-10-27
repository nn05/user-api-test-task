const mongoose = require('mongoose')

const User = function (usesData) {
    this._id = new mongoose.Types.ObjectId
    this.userId = this._id.toString()
    this.name = ''
    this.firstName = ''
    this.lastName = ''
    this.email = ''
    this.homePhone = ''
    this.inquiryDetails = {}
    this.interests = []
    this.isBuyer = false
    this.isSeller = false
    this.isArchived = false
    this.isSpam = false
    for (prop in usesData) {
        this[prop] = usesData[prop]
    }
}

const userSchema = new mongoose.Schema({
    userId: { type: String },
    name: { type: String },
    firstName: String,
    lastName: String,
    email: String,
    homePhone: String,
    inquiryDetails: {},
    interests: [String],
    isBuyer: Boolean,
    isSeller: Boolean,
    isArchived: Boolean,
    isSpam: Boolean
}
)

const UserModel = mongoose.model('User', userSchema)

exports.UserModel = UserModel
exports.User = User
