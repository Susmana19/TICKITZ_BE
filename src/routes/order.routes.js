//import eksternal
const express = require('express')
const router = express()


//import controller internal
const orderController = require('../controllers/order.controllers')

//route
router.post('/',  orderController.add)
router.get('/user/:user_id', orderController.getByUserId)
router.get('/movies/:movies_id', orderController.getByMoviesId)

//export
module.exports = router;