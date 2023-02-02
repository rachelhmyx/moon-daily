var express = require("express");
var router = express.Router();

var passport = require("passport");
// var jwt = require("jsonwebtoken");
// const jwtSettings = require("../constants/jwtSettings");
// const { findDocuments, findDocument } = require("../helpers/MongoDbHelper");

/* GET home page/admin-dashboard */
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  function (req, res, next) {
    res.render("index", { title: "Express" });
  }
);

module.exports = router;
