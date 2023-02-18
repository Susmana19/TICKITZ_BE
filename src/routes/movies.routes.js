const express = require("express");
const router = express();
const verifyToken = require("../middleware/verifyToken");
//import controller=
const moviesController = require("../controllers/movies.controllers");
const formUpload = require("../middleware/upload");

router.post("/", formUpload.single("image"), moviesController.add); //add movies //kurang verifytoken
router.get("/", moviesController.get);
router.get("/:id", moviesController.getDetail);
module.exports = router;
