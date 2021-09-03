const express = require("express");
const basicAuth = require("express-basic-auth");
const cors = require('cors');
const router = express.Router();
router.use(cors());
router.use(express.json());

router.get("/", (req, res) => {
  res.send("Server is up and running");
});

//setting up basic auth - as soon as we put this, the website become password-protected
router.use(basicAuth({
  users: { "admin": "password", "yuki": "password" },
  //challenge: true,
  unauthorizedResponse: () => {
    return "Unauthorized";
  },
  authorizer: (username, password) => {
    console.log("#1. usernamd and password input: ", username, password);
    const admin = {
      _username: "test",
      _password: "test"
    };
    const userMatches = basicAuth.safeCompare(username, admin._username);
    const passwordMatches = basicAuth.safeCompare(password, admin._password);
    if (userMatches && passwordMatches) {
      //both match
      return userMatches & passwordMatches;
    } else {
      console.log("Unauthorized");
    }
  },
}));

//after authorized, send login data to the server
router.put("/api/login", (req, res) => {
  //create input data object
  let param = {
    username: req.body.username,
    password: req.body.password
  };

  //Check if the login user is ok to be authorized
  if (param.username === "test" && param.password === "test") {
    res.send({
      msg: "SUCCESS",
      username: param.username,
      password: param.password
    });
  } else {
    res.send({
      msg: "FAIL",
      username: param.username,
      password: param.password
    });
  }
});

module.exports = router;