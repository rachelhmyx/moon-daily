var express = require("express");
var router = express.Router();
const yup = require("yup");
const { validateSchema } = require("../schemas");
const { findDocuments, findDocument } = require("../helpers/MongoDbHelper");

//Login validate: data user đưa lên có đúng với kiểu đã được định nghĩa hay không:
const loginSchema = yup.object({
  body: yup.object({
    username: yup.string().email().required(),
    password: yup.string().required(),
  }),
});

router.post(
  "/login-validate",
  validateSchema(loginSchema),
  async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const found = await findDocuments(
      {
        query: {
          username: username,
          password: password,
        },
      },
      "login"
    );

    if (found && found.length > 0) {
      res.send({ message: "Login Success" });
      return;
    }
    res.status(401).send({ message: "Login Failed" });
  }
);

module.exports = router;
