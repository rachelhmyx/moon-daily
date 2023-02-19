const { default: mongoose } = require("mongoose");
const { SubCategory } = require("../models");
var express = require("express");
var router = express.Router();
const { findDocuments } = require("../helpers/MongoDbHelper");

mongoose.connect("mongodb://127.0.0.1:27017/Moon-Daily");

router.post("/", (req, res, next) => {
  try {
    const data = req.body;
    const newItem = new SubCategory(data);
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
    SubCategory.find()
      .populate("category")
      .then((result) => {
        res.send(result);
      });
  } catch (error) {
    res.sendStatus(500);
    console.log("Error:", error);
  }
});

//Get By Id:
// router.get("/:id", function (req, res, next) {
//   try {
//     const { id } = req.params;
//     SubCategory.findById(id).then((result) => {
//       res.send(result);
//     });
//   } catch (err) {
//     res.sendStatus(500);
//   }
// });

router.delete("/:id", (req, res, next) => {
  try {
    const { id } = req.params;
    SubCategory.findByIdAndDelete(id).then((result) => {
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
    SubCategory.findByIdAndUpdate(id, data, { new: true })
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
              $expr: { $eq: ["$$id", "$subCategoryId"] },
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

  findDocuments({ aggregate: aggregate }, "subcategories")
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = router;
