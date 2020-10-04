var { Test } = require("../models/test");

exports.list = (req, res) => {
  Test.find()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.detail = (req, res) => {
  const id = req.params.id;

  Test.findById(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: "Error 404 !" });
      else res.send(data);
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.create = function (req, res) {
  const test = new Test({ 
		Ok: req.body.Ok,
 });

  test
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

exports.update = function (req, res) {
  const id = req.params.id;

  Test.findByIdAndUpdate(id, req.body)
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

  Test.findByIdAndRemove(id)
    .then((data) => {
      if (!data) res.status(404).send({ message: `Error 404 !` });
      else res.send({ data });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
