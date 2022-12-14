const model = require("../models");
const bcrypto = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validator = require("fastest-validator");

//User SignUp Section
const signUp = (req, res) => {
  model.user
    .findOne({ where: { email: req.body.email } })
    .then((result) => {
      if (result) {
        res.status(409).json({ messege: "Email already exist" });
      } else {
        const User = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        };
        const schema = {
          name: { type: "string", optional: "false", max: 100 },
          email: { type: "email", optional: "false" },
          password: {
            type: "string",
            pattern:"^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&-+=()])(?=\\S+$)",
            min: 8,
            optional: "false",
            max: 20,
          },
        };
        const validate = new validator();
        const validationResponse = validate.validate(User, schema);
        if (validationResponse !== true) {
          return res.status(400).json({
            messege: "Validation failed",
            error: validationResponse,
          });
        }
        bcrypto.genSalt(10, (err, salt) => {
          bcrypto.hash(req.body.password, salt, (err, hash) => {
            User.password = hash;

            model.user
              .create(User)
              .then((result) => {
                res.status(201).json({
                  messege: "User create successfully",
                });
              })
              .catch((error) => {
                res.status(500).json({
                  error: error,
                });
              });
          });
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        error: error,
      });
    });
};

//User Login Section
const login = (req, res) => {
  // console.log('hello');
  model.user
    .findOne({ where: { email: req.body.email } })
    .then((User) => {
      if (User === null) {
        res.status(401).json({ messege: "Email doesn't exist" });
      } else {
        bcrypto.compare(req.body.password, User.password, (err, result) => {
          if (result) {
            const token = jwt.sign(
              {
                email: User.email,
                userId: User.id,
                // password: User.password
              },
              process.env.JWT_KEY,
              // "secret",
              (err, token) => {
                res.status(200).json({
                  messege: "Authentication Successful",
                  token: token,
                });
              }
            );
          } else {
            res.status(401).json({ messege: "Invalid password" });
          }
        });
      }
    })
    .catch((error) => {
      res.status(500).json({
        messege: "Something went wrong" + error,
      });
    });
};

module.exports = {
  signUp: signUp,
  login: login,
};
