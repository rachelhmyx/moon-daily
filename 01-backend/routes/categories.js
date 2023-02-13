const { default: mongoose } = require("mongoose");
const { Category } = require("../models");
var express = require("express");
var router = express.Router();
const { findDocuments } = require("../helpers/MongoDbHelper");
mongoose.connect("mongodb://127.0.0.1:27017/Moon-Daily");

router.post("/", (req, res, next) => {
  try {
    const data = req.body;
    const newItem = new Category(data);
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
    Category.find()
      .populate("createdby")
      .populate("updatedby")
      .then((result) => {
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
    Category.findByIdAndDelete(id).then((result) => {
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
    Category.findByIdAndUpdate(id, data, { new: true })
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

//Hiển thị tất cả danh mục (Categories) với số lượng hàng hóa trong mỗi danh mục:
router.get("/number-products", function (req, res, next) {
  const aggregate = [
    {
      $lookup: {
        from: "products",
        let: { id: "$_id" },
        pipeline: [
          {
            $match: {
              $expr: { $eq: ["$$id", "$categoryId"] },
            },
          },
        ],
        as: "products", //<output array field>
      },
    },
    {
      $addFields: { numberOfProducts: { $size: "$products" } }, //Sử dụng $size khi muốn tính số phần tử trong một mảng.
    },
  ];

  findDocuments({ aggregate: aggregate }, "categories")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

//Hiển thị tên hàng hóa trong mỗi danh mục:
router.post("/search/product", function (req, res) {
  try {
    const { name } = req.body;
    const query = {
      name: name,
    };
    Category.aggregate([
      { query },
      {
        $lookup: {
          from: "products",
          let: { id: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ["$$id", "$categoryId"] },
              },
            },
          ],
          as: "products", //<output array field>
        },
      },
      {
        $unwind: {
          path: "$products",
          preserveNullAndEmptyArrays: true,
        },
      },
    ])
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  } catch (error) {
    res.sendStatus(500).json(error);
  }
});
module.exports = router;
