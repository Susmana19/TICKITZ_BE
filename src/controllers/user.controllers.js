//import eksternal
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {JWT_PRIVATE_KEY} = process.env


//import internal
const userModel = require('../models/user.models')

const { unlink } = require('node:fs')

const userController = {
    getById: (req, res)=> {
        return userModel.getById(req.params.id)
        .then((result) => {
            return res.status(200).send({ message: "succes", data: result })
        })
    },
    update: (req, res)=> {
        bcrypt.hash(req.body.password, 10, (err, hash)=>{
                //store hash in your password DB
                if(err){
                    return res.status(500).send({ message: err.message })
                } else {
                    const request = {
                        ...req.body,
                        user_id: req.params.id,
                        profile_image: req.file,
                        password: hash            
                    }
                    return userModel.update(request)
                        .then((result)=> {
                            return res.status(201).send({ message: "succes", data: result })
                        }).catch((error)=> {
                            return res.status(500).send({ message: error })
                        }) 
                }
            })
    }
}

module.exports = userController;