var express = require("express");
var router = express.Router();
const yup = require("yup");
//--------------------------------------------
const { default: mongoose } = require("mongoose");
const { UserSignUp } = require("../models");
const bcrypt = require("bcrypt");
//--------------------------------------------
const { validateSchema } = require("../schemas");
//import passport và jwt để làm authentication:
var passport = require("passport");
var jwt = require("jsonwebtoken");
const jwtSettings = require("../constants/jwtSettings");
const { findDocuments, findDocument } = require("../helpers/MongoDBHelper");
//----------------------------------------------------------
mongoose.connect("mongodb://127.0.0.1:27017/Moon-Daily");
//-----------------------------------------------------------

//Login validate: data user đưa lên có đúng với kiểu đã được định nghĩa hay không:
const loginSchema = yup.object({
  body: yup.object({
    email: yup.string().email().required(),
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

//Authentication: xác thực user --> sau khi login  xong sẽ cấp token
router.post(
  "/login-jwt",
  validateSchema(loginSchema),
  async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    //------------------------------------------------------
    const user = await UserSignUp.findOne({ email: email });

    if (user) {
      const id = user._id.toString();
      // check user password with hashed password stored in the database
      const validPassword = await bcrypt.compare(password, user.password);

      if (!validPassword) {
        res.status(400).json({ error: "Invalid Password" });
      }
      //Cấp Token: Sau khi login được sẽ cấp cho user Token:
      //Payload là 1 object data, chứa thông tin của người dùng sau khi login thành công:
      var payload = {
        user: {
          email: email,
          username: user.username,
        },
        application: "ecommerce",
      };
      //---------------------------------------------------------

      var secret = jwtSettings.SECRET;
      var token = jwt.sign(payload, secret, {
        expiresIn: 86400, // expires in 24 hours (24 x 60 x 60)
        audience: jwtSettings.AUDIENCE,
        issuer: jwtSettings.ISSUER,
        subject: id, // Thường dùng để kiểm tra JWT lần sau
        algorithm: "HS512", //Thuật toán mã hóa
      });

      //Refresh Token: sử dụng refresh token trong trường hợp token đã sử dụng trước đó bị hết hạn:
      const refreshToken = jwt.sign(
        {
          id,
        },
        secret,
        {
          expiresIn: "30d", //hạn dùng là 30 ngày
        }
      );

      res.send({ status: true, message: "Login Success", token, refreshToken });
      return;
    }
    res.status(401).send({ message: "Login Failed" });
  }
);

//Gọi refresh token ra để rèn lại token cũ trc đó đã bị hết hạn:
router.post("/refresh-token", async (req, res, next) => {
  const { refreshToken } = req.body;
  jwt.verify(refreshToken, jwtSettings.SECRET, async (err, decoded) => {
    if (err) {
      // return res.sendStatus(406); lỗi 406 là lỗi NOT ACCEPTABLE
      return res.status(401).json({ message: "refreshToken is invalid" });
    } else {
      console.log("🍎 decoded", decoded);
      const { id } = decoded;
      const user = await findDocument(id, "login");
      if (user && user.active) {
        const secret = jwtSettings.SECRET;

        const payload = {
          message: "payload",
        };

        const token = jwt.sign(payload, secret, {
          expiresIn: 10, //24 * 60 * 60, // expires in 24 hours (24 x 60 x 60)
          audience: jwtSettings.AUDIENCE,
          issuer: jwtSettings.ISSUER,
          subject: id, // Thường dùng để kiểm tra JWT lần sau
          algorithm: "HS512",
        });

        return res.json({ token });
      }
      return res.sendStatus(401);
    }
  });
});

router.get(
  "/login-authentication",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send("OK");
  } //phải nhập Token vào thì mới vào được
);

//CHECK ROLES-Authorization:
const allowRoles = (...roles) => {
  // return a middleware
  return (request, response, next) => {
    // GET BEARER TOKEN FROM HEADER
    const bearerToken = request.get("Authorization").replace("Bearer ", "");

    // DECODE TOKEN
    const payload = jwt.decode(bearerToken, { json: true });

    // AFTER DECODE TOKEN: GET UID FROM PAYLOAD
    const { sub } = payload;

    // FIND BY _id
    findDocument(sub, "login")
      .then((user) => {
        if (user && user.roles) {
          let ok = false;
          user.roles.forEach((role) => {
            if (roles.includes(role)) {
              ok = true;
              return;
            }
          });
          if (ok) {
            next();
          } else {
            response.status(403).json({ message: "Forbidden" }); // user is forbidden
          }
        } else {
          response.status(403).json({ message: "Forbidden" }); // user is forbidden
        }
      })
      .catch(() => {
        response.sendStatus(500);
      });
  };
};

// ------------------------------------------------------------------------------------------------
// CALL API JWT AUTHENTICATION & CHECK ROLES(Authorization)
// ------------------------------------------------------------------------------------------------
router.get(
  "/roles",
  passport.authenticate("jwt", { session: false }),
  allowRoles("administrator", "manager"),
  function (req, res, next) {
    res.json({ ok: true });
  }
);

module.exports = router;
