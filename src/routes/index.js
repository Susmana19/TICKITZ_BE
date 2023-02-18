const express = require("express");
const router = express();
const moviesRoute = require("./movies.routes");
const theatersRoute = require("./theaters.routes");

router.get("/", (req, res) => {
  return res.send("backend for tickitz ");
});

router.use("/movies", moviesRoute);
router.use("/theaters", theatersRoute);

module.exports = router;
