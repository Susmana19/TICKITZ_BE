const express = require("express");
const router = express();
const verifyToken = require("../middleware/verifyToken");
//import controller=
const theatersController = require("../controllers/theaters.controllers");
const formUpload = require("../middleware/upload");

router.post("/:moviesId", formUpload.single("image"), theatersController.add); //add movies //kurang verifytoken
// router.get("/", moviesController.get);
// router.get("/:id", moviesController.getDetail);
module.exports = router;
