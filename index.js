const express = require("express");
const basicAuth = require("express-basic-auth");
const cors = require('cors');
const app = express();
const port = 3001;

//avoid cross domain error - when we edit frontend and backend at the same time
app.use(cors());

//setting up basic auth - as soon as we put this, the website become password-protected
app.use(basicAuth({
  authorizer: (username, password) => {
    let _username = "Yuki";
    let _password = "mypassword";
    if ((basicAuth.safeCompare(_username, username) === true) && (basicAuth.safeCompare(_password, password) === true)) {
      //both match
      console.log("both password and username match");
    }
  },

  users: { "admin": "password", "admin2": "password2" }
}));

//Challenge
app.use(basicAuth({
  users: { "admin": "password", "admin2": "password2" },
  challenge: true
}));

//setting up routes
app.get("/", (req, res, next) => {
  res.send("Authorized!!!");
});

// const getVersion = () => {
//   return "1.0";
// };
// app.get("/version", getVersion); // can call function

app.post("/login", (req, res, next) => {
  console.log(req.json);
  console.log(req);
  res.send("I got", req.body);
});

app.put("/login", (req, res, next) => {
  console.log(req.json());
  console.log(req);
  res.send("I got", req.body);
});

app.get("/version", (req, res) => {
  res.send("1.0");
});

app.get("testName", (req, res) => {
  res.send(users);
});

//server listens
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});