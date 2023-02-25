const { default: mongoose } = require("mongoose");
const { Slide } = require("../models");
var express = require("express");
var router = express.Router();
mongoose.connect("mongodb://127.0.0.1:27017/Moon-Daily");

router.post("/", (req, res, next) => {
  try {
    const data = req.body;
    const newItem = new Slide(data);
    newItem.save().then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.sendStatus(500);
    console.log("Error:", error);
  }
});

router.get("/", (req, res, next) => {
  try {
    Slide.find().then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.sendStatus(500);
    console.log("Error:", error);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    Slide.findByIdAndDelete(id).then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.sendStatus(500);
  }
});

router.patch("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    Slide.findByIdAndUpdate(id, data, { new: true })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.sendStatus(500);
  }
});
module.exports = router;
