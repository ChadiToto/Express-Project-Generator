var { Model } = require("../models/mymodel");

exports.list = (req, res) => {
  Model.find()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.detail = (req, res) => {
  const id = req.params.id;

  Model.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Error 404 !" });
      else res.send(data);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function (req, res) {
  const mymodel = new Model({ fields });

  mymodel
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = function (req, res) {
  const id = req.params.id;

  Model.findByIdAndUpdate(id, req.body)
    .then((data) => {
      if (!data) res.status(404).send({ message: `Error 404 !` });
      else res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      });
    });
};

exports.delete = function (req, res) {
  const id = req.params.id;

  Model.findByIdAndRemove(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: `Error 404 !` });
      else res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
