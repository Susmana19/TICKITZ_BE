
//import eksternal
const express = require('express')
const router = express()


//import internal
// const productRoute = require('./product.routes')
const userRoute = require('./user.routes')
const authRoute = require('./auth.routes')

const moviesRoute = require("./movies.routes");
const theatersRoute = require("./theaters.routes");

// routing home
router.get('/', (req, res)=> {
    return res.send("Backend successfully running at home")
})

//routing products
// router.use('/products', productRoute) 

//routing users
router.use('/users', userRoute) 

//routinng auth
router.use('/auth', authRoute)
router.use("/movies", moviesRoute);
router.use("/theaters", theatersRoute);


module.exports = router;

