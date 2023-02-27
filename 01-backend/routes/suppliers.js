const { default: mongoose } = require("mongoose");
const { Supplier } = require("../models");
var express = require("express");
var router = express.Router();
const { findDocuments } = require("../helpers/MongoDBHelper");

mongoose.connect("mongodb://127.0.0.1:27017/Moon-Daily");

router.post("/", (req, res) => {
  try {
    const data = req.body;
    const newItem = new Supplier(data);
    newItem
      .save()
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

router.get("/", (req, res) => {
  try {
    Supplier.find()
      .populate("category")
      .then((result) => {
        res.send(result);
      });
  } catch (error) {
    res.sendStatus(500);
    console.log("Error:", error);
  }
});

router.patch("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    Supplier.findByIdAndUpdate(id, data, { new: true })
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
    Supplier.findByIdAndDelete(id)
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

//QUESTION 19: Hiển thị tất cả nhà cung cấp (Suppliers) với số lượng hàng hóa mỗi nhà cung cấp:
router.get("/number-products", function (req, res, next) {
  const aggregate = [
    {
      $lookup: {
        from: "products",
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$$id", "$supplierId"] },
            },
          },
        ],
        as: "products",
      },
    },
    {
      $addFields: { numberOfProducts: { $size: "$products" } },
    },
  ];

  findDocuments({ aggregate: aggregate }, "suppliers")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});
module.exports = router;
