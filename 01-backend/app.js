var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

// const passport = require("passport");
// const JwtStrategy = require("passport-jwt").Strategy;
// const ExtractJwt = require("passport-jwt").ExtractJwt;
// const jwtSettings = require("./constants/jwtSettings");

var indexRouter = require("./routes/index");
var signUpUserRouter = require("./routes/signup");
var authRouter = require("./routes/auth");
var categoriesRouter = require("./routes/categories");
var subCategoriesRouter = require("./routes/subCategories");
var customersRouter = require("./routes/customers");
var employeesRouter = require("./routes/employees");
var productsRouter = require("./routes/products");
var suppliersRouter = require("./routes/suppliers");
var ordersRouter = require("./routes/orders");
var slidesRouter = require("./routes/slides");
var featuresRouter = require("./routes/features");
var uploadRouter = require("./routes/upload");
var advertisementsRouter = require("./routes/advertisements");

var cors = require("cors");
// const { findDocument } = require("./helpers/MongoDbHelper");
var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  cors({
    origin: "*",
  })
);

// Passport: jwt
// const opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = jwtSettings.SECRET;
// opts.audience = jwtSettings.AUDIENCE;
// opts.issuer = jwtSettings.ISSUER;

// passport.use(
//   new JwtStrategy(opts, async (payload, done) => {
//     //new JwtStrategy giống như là 1 middleware gác cổng cho các route, payload là data đc đưa vào,  sua khi check xong phần kĩ thuật thì sẽ chạy xuống câu lệnh if bên dưới
//     // console.log(payload);
//     const id = payload.sub;
//     const found = await findDocument(id, "login");
//     if (found && found.active) {
//       let error = null;
//       let user = true;
//       return done(error, user);
//     } else {
//       let error = null;
//       let user = false;
//       return done(error, user);
//     }
//   })
// );
app.use("/", indexRouter);
app.use("/auth", authRouter);
app.use("/sign-up", signUpUserRouter);
app.use("/categories", categoriesRouter);
app.use("/sub-categories", subCategoriesRouter);
app.use("/customers", customersRouter);
app.use("/employees", employeesRouter);
app.use("/products", productsRouter);
app.use("/suppliers", suppliersRouter);
app.use("/orders", ordersRouter);
app.use("/slides", slidesRouter);
app.use("/features", featuresRouter);
app.use("/advertisements", advertisementsRouter);
app.use("/upload", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
