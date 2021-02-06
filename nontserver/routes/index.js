var express = require("express");
var router = express.Router();
const loginRouter = require("./login");
var db = require("../Controllers/dbconnector");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/login", loginRouter);

module.exports = router;
