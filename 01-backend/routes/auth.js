const { default: mongoose } = require("mongoose");
const { User } = require("../models");
var express = require("express");
var router = express.Router();
const { findDocuments } = require("../helpers/MongoDBHelper");

mongoose.connect("mongodb://127.0.0.1:27017/Moon-Daily");

//Create a User:
router.post("/register", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const found = await findDocuments(
      {
        query: {
          email: email,
          password: password,
        },
      },
      "users"
    );
    if (found && found.length > 0) {
      res.send({ message: "User Already Exists!" });
    } else {
      const newUser = new User(req.body);
      newUser.save().then((result) => {
        res.send(result);
      });
    }
  } catch (error) {
    res.sendStatus(500);
    console.log("Error:", error);
  }
});

//Login User:
router.post("/login", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;

    //Check if user exist or not:

    const found = await findDocuments(
      {
        query: {
          email: email,
          password: password,
        },
      },
      "users"
    );

    if (found && (await found.isPasswordMatched(password))) {
      res.json(found);
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.sendStatus(500);
    console.log("Error:", error);
  }
});

module.exports = router;
