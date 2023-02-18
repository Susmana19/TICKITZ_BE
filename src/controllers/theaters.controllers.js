const theatersModel = require("../models/theaters.models");
const { unlink } = require("node:fs");
const Pagination = require("../../helper/pagination");

const theatersController = {
  add: (req, res) => {
    const request = {
      ...req.body,
      //   image: req.file.filename,
      moviesId: req.params.moviesId,
    };
    return theatersModel
      .add(request)
      .then((result) => {
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = theatersController;
