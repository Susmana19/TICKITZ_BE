
//import eksternal
const express = require('express')
const router = express()


//import internal
const userRoute = require('./user.routes')
const authRoute = require('./auth.routes')
const moviesRoute = require("./movies.routes");
const theatersRoute = require("./theaters.routes");
const orderRoute = require('./order.routes')

// routing home
router.get('/', (req, res)=> {
    return res.send("Backend successfully running at home")
})

//routing users
router.use('/users', userRoute) 

//routing
router.use('/auth', authRoute)
router.use("/movies", moviesRoute);
router.use("/theaters", theatersRoute);

//routing order
router.use('/order', orderRoute) 

module.exports = router;

