const { default: mongoose } = require("mongoose");
const { Employee } = require("../models");
var express = require("express");
var router = express.Router();

mongoose.connect("mongodb://127.0.0.1:27017/Moon-Daily");

router.post("/", (req, res) => {
  try {
    const data = req.body;
    const newItem = new Employee(data);
    newItem.save().then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.sendStatus(500);
    console.log("Error:", error);
  }
});

router.get("/", (req, res) => {
  try {
    Employee.find().then((result) => {
      res.send(result);
    });
  } catch (error) {
    res.sendStatus(500);
    console.log("Error", error);
  }
});

router.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    Employee.findByIdAndUpdate(id, data, { new: true })
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.sendStatus(500);
    console.log("Error:", error);
  }
});

router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    Employee.findByIdAndDelete(id)
      .then((result) => {
        res.send(result);
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  } catch (error) {
    res.sendStatus(500);
    console.log("Error:", error);
  }
});
module.exports = router;
