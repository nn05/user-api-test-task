const { UserModel } = require("../models/user.model")

async function createUser(userData) {
    const user = new UserModel(userData);
    return user.save();
}

async function getUsers(userID) {
    return UserModel
    .find({}, { _id: 0, __v: 0 })
    .exec()
    .catch(err => err.message)
}

async function getUser(userID) {
    return UserModel
    .findById(userID, { _id: 0, __v: 0 })
    .exec()
    .catch(err => err.message)
}

async function updateUser(userID, userData) {
    return UserModel
    .findByIdAndUpdate(userID, userData, {returnDocument: 'after', select: { _id: 0, __v: 0 } })
    .exec()
    .catch(err => err.message)
}

async function deleteUser(userID) {
    return UserModel
    .findByIdAndRemove(userID, {returnDocument: 'before', select: { _id: 0, __v: 0 } })
    .exec()
    .catch(err => err.message)
}

exports.createUser = createUser
exports.getUsers = getUsers
exports.getUser = getUser
exports.updateUser = updateUser
exports.deleteUser = deleteUser