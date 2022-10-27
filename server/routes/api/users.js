const express = require('express')
const { validateUser, validatePatchUser, validateUserId } = require('../../middleware/users.validator')
const { createUserHandler,
            getUsersHandler,
            getUserHandler,
            updateUserHandler,
            patchUserHandler,
            deleteUserHandler
       } = require('../../controllers/user.controller')

const validate = (req, res, next) => {
    const validateResult = validateUser(req.body)
    if (!validateResult.valid) {
        res.status(400)
        res.json(validateResult.errors)
    }
    else {
        next()
    }
}

const validatePatch = (req, res, next) => {
    const validateResult = validatePatchUser(req.body)
    if (!validateResult.valid) {
        res.status(400)
        res.json(validateResult.errors)
    }
    else {
        next()
    }
}

const validateUserIdParams = (req, res, next) => {
    const { userId } = req.params
    const validateResult = validateUserId(userId)
    if (!validateUserId(userId)) {
        res.status(400)
        res.json('Incorrect userId')
    }
    else {
        next()
    }
}

const router = express.Router()

router.get('/', async (req, res) => {
    const result = await getUsersHandler(req, res)
    res.json(result)
})
router.get('/:userId', validateUserIdParams, async (req, res) => {
    const result = await getUserHandler(req, res)
    res.json(result)
})

router.post('/', validate, async (req, res) => {
    const result = await createUserHandler(req, res)
    res.json(result)
})

router.put('/:userId', [validate, validateUserIdParams], async (req, res) => {
    const result = await updateUserHandler(req, res)
    res.json(result)
})

router.patch('/:userId', [validatePatch, validateUserIdParams], async (req, res) => {
    const result = await patchUserHandler(req, res)
    res.json(result)
})

router.delete('/:userId', validateUserIdParams, async (req, res) => {
    const result = await deleteUserHandler(req, res)
    res.json(result)
})

module.exports = router
