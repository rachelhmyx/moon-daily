const { default: mongoose } = require("mongoose");
const { User } = require("../models");
var express = require("express");
var router = express.Router();
const { findDocuments } = require("../helpers/MongoDBHelper");

mongoose.connect("mongodb://127.0.0.1:27017/Moon-Daily");

router.post("/register", async (req, res) => {
  try {
    const email = req.body;
    const found = await findDocuments(
      {
        query: {
          email: email,
        },
      },
      "users"
    );
    if (found && found.length > 0) {
      res.send({ message: "User Already Exists!" });
    } else {
      const newUser = new User(email);
      newUser.save().then((result) => {
        res.send(result);
      });
    }
  } catch (error) {
    res.sendStatus(500);
    console.log("Error:", error);
  }
});

module.exports = router;
