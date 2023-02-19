//import eksternal
const express = require('express')
const router = express()

//import form upload
const formUpload = require('../middleware/formUpload')
//import controller internal
const userController = require('../controllers/user.controllers')

//route users
router.get('/:id', userController.getById)
router.patch('/:id', formUpload.single("profile_image"), userController.update)

//export
module.exports = router;