const express = require("express");
const basicAuth = require("express-basic-auth");
const cors = require('cors');
const app = express();
const port = 5000;

const crudDB = require ("./crudDB")

//avoid cross domain error - when we edit frontend and backend at the same time
app.use(cors());
app.use(express.json());

//setting up basic auth - as soon as we put this, the website become password-protected
app.use(basicAuth({
  users: { "admin": "password", "yuki": "password" },
  //challenge: true,
  unauthorizedResponse: () => {
    console.log("I am here in basicAuth config. Unauthorised!!");
    return "You are unauthorized!!";
  },
  authorizer: (username, password) => {
    console.log("#1. usernamd and password input: ", username, password);
    const admin = {
      _username: "yuki",
      _password: "password"
    };
    const userMatches = basicAuth.safeCompare(username, admin._username);
    const passwordMatches = basicAuth.safeCompare(password, admin._password);
    if (userMatches && passwordMatches) {
      //both match -- working
      console.log("#2. Authorized!! both password and username match", userMatches, passwordMatches);
      return userMatches & passwordMatches;
    }
  },
}));

//after authorized, send login data to the server
app.put("/api/login", (req, res) => {
  //create input data object
  console.log(req);
  let param = {
    username: req.body.username,
    password: req.body.password
  };

  console.log("#3. req.body is ", param);

  //Check if the login user is ok to be authorized
  if (param.username === "yuki" && param.password === "password") {
    console.log("I am here returning json to frontend");

    // db.read() --- read db and do crud operation here

    res.send({
      msg: "SUCCESS",
      username: param.username,
      password: param.password
    });
  }
});

//server listens
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//================ Templates ==================
//****************** Use Router : Implement later ***************** */
// const secureRoute = express.Router();
// secureRoute.use(basicAuth, (req, res) => {

// });

// const insecureRoute = express.Router();

// secureRoute.put("/secret", () => {

// });

// insecureRoute.put("/public", () => {

// });

// const getVersion = () => {
//   return "1.0";
// };
// app.get("/version", getVersion); // can call function

// app.post("/login", (req, res, next) => {
//   console.log(req);
//   console.log(req.body);
//   // res.send("I got", req.body);
//   res.send(`I got: ${JSON.stringify(req.body)}`);
// });

// app.put("/login", (req, res, next) => {
//   console.log(req);
//   console.log(req.body);
//   // res.send("I got", req.body);
//   res.send(`I got: ${JSON.stringify(req.body)}`);
// });
