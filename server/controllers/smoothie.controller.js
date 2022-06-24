const Smoothie = require("../models/smoothies.model");

const createNewSmoothie = (req, res) => {
  // CRUD - Create
  Smoothie.create(req.body)
    .then((newSmoothie) => {
      res.json({ newSmoothie });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};
// Read
const getAllSmoothies = (req, res) => {
  Smoothie.find()
    .then((allSmoothies) => {
      res.json({ allSmoothies });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

// Get One
const getOneSmoothie = (req, res) => {
  Smoothie.findOne({ _id: req.params.id })
    .then((queriedSmoothie) => {
      res.json({ queriedSmoothie });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

// Update
const updateSmoothie = (req, res) => {
  Smoothie.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true,
  })
    .then((updatedSmoothie) => {
      res.json({ updatedSmoothie });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

// Delete
const deleteSmoothie = (req, res) => {
  Smoothie.deleteOne({ _id: req.params.id })
    .then((deletedResponse) => {
      res.json({ deletedResponse });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
};

module.exports = {
  createNewSmoothie,
  getAllSmoothies,
  getOneSmoothie,
  updateSmoothie,
  deleteSmoothie,
};
