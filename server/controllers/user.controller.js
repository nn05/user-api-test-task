const { getUsers, createUser, getUser, updateUser, deleteUser } = require('../services/user.service')
const { User } = require('../models/user.model')
const { appendToLog } = require('../utils/logger')

function setUserCalcProperties(inputData) {
    const userData = {
        ...inputData,
        name: `${inputData.firstName} ${inputData.lastName}`,
        isBuyer: inputData.interests.some(item => item === 'Buyer'),
        isSeller: inputData.interests.some(item => item === 'Seller')
    }

    return userData
}

function checkDBResponce(req, res, dbResponce) {
    if (!dbResponce) {
        res.status(400)
        return { error: `Check request params ${JSON.stringify(req.params)}` } 
    }

    if (typeof dbResponce !== 'object') {
        res.status(500)
        return { error: dbResponce } 
    }
    
    return dbResponce
}

async function getUsersHandler(req, res) {
    const dbResponce = await getUsers()
    return checkDBResponce(req, res, dbResponce)
}

async function getUserHandler(req, res) {
    const { userId } = req.params
    const dbResponce = await getUser(userId);
    return checkDBResponce(req, res, dbResponce)
}

async function createUserHandler(req, res) {
    const input = req.body
    const userData = new User(input)
    const userFullData = setUserCalcProperties(userData)

    const dbResponce = await createUser(userFullData);
    appendToLog('Create new user', dbResponce)
    return checkDBResponce(req, res, dbResponce)

}

async function updateUserHandler(req, res) {
    const { userId } = req.params
    const input = {...req.body, userId }
    const userData = new User(input)
    delete userData._id
    const userFullData = setUserCalcProperties(userData)
    const dbResponce = await updateUser(userId, userFullData);
    return checkDBResponce(req, res, dbResponce)
}

async function patchUserHandler(req, res) {
    const { userId } = req.params
    const input = req.body
    const oldUserData = await getUser(userId);
    const responce = checkDBResponce(req, res, oldUserData)
    if (typeof responce.error !== 'undefined') {
        return responce
    }
    userUdtatedData = { ...oldUserData.toJSON(), ...input }
    const userFullData = setUserCalcProperties(userUdtatedData)
    const dbResponce = await updateUser(userId, userFullData);
    return checkDBResponce(req, res, dbResponce)
}

async function deleteUserHandler(req, res) {
    const { userId } = req.params
    const dbResponce = await deleteUser(userId);
    return checkDBResponce(req, res, dbResponce)
}

exports.createUserHandler = createUserHandler
exports.getUsersHandler = getUsersHandler
exports.getUserHandler = getUserHandler
exports.updateUserHandler = updateUserHandler
exports.patchUserHandler = patchUserHandler
exports.deleteUserHandler = deleteUserHandler