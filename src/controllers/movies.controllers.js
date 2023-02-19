const moviesModel = require("../models/movies.models");
const { unlink } = require("node:fs");
const Pagination = require("../../helper/pagination");

const moviesController = {
  add: (req, res) => {
    const request = {
      ...req.body,
      image: req.file.filename,
    };
    console.log(request, "ini data");
    return moviesModel
      .add(request)
      .then((result) => {
        return res.status(201).send({ message: "succes", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  get: (req, res) => {
    let { search, category, sortBy, page, limit } = req.query;
    let offset = Pagination.buildOffset(page, limit);
    return moviesModel
      .get(search, category, sortBy, limit, offset)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
  getDetail: (req, res) => {
    // const id = req.params.id;
    return moviesModel
      .getDetail(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },

  remove: (req, res) => {
    return moviesModel
      .remove(req.params.id)
      .then((result) => {
        return res.status(200).send({ message: "success", data: result });
      })
      .catch((error) => {
        return res.status(500).send({ message: error });
      });
  },
};

module.exports = moviesController;
