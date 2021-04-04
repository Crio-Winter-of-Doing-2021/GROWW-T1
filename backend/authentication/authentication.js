import mongoose from "mongoose";
const users = require("../models/user_model.js");
const pages = require("../models/page_model.js");
const products = require("../models/product_model.js");

exports.loggingUser = async (req, res) => {
  if (req.body.status === "logging in") {
    let password = req.body.password;
    await users.findOne({ email: req.body.email }, (err, user) => {
      if (err) {
        return res.status(400).json({ success: false, error: err });
      } else if (user === null) {
        res.status(404).send("You haven't registered. Sign in first");
      } else {
        if (user.password === password) {
          users
            .findOneAndUpdate(
              { email: req.body.email },
              { status: "logged in" },
              { useFindAndModify: false }
            )
            .then((data) => {
              if (!data) {
                res
                  .status(404)
                  .send("Cannot update status . Maybe user was not found!");
              } else {
                console.log(data);
                res.status(200).send(user);
              }
            })
            .catch((err) => {
              res.status(404).send("Error updating user log-in status");
            });
        } else {
          res.status(403).send("Wrong password. Try again!");
        }
      }
    });
  } else {
    users
      .findOneAndUpdate(
        { email: req.body.email },
        { status: "logged out" },
        { useFindAndModify: false }
      )
      .then((data) => {
        if (!data) {
          res
            .status(404)
            .send("Cannot update status . Maybe user was not found!");
        } else {
          console.log(data);
          res.status(201).send("User logged out successfully.");
        }
      })
      .catch((err) => {
        res.status(404).send("Error updating user log-in status");
      });
  }
};

exports.registerUser = async (req, res) => {
  let obj = {
    user_name: req.body.username,
    phone_number: req.body.phone_number,
    status: "logged in",
    password: req.body.password,
    email: req.body.email,
    kyc_status: req.body.kyc_status,
    kyc_details: { pan: req.body.pan },
    orders: [],
  };
  users.find({ email: req.body.email }, (err, user) => {
    if (!user.length) {
      let new_user = new users(obj);
      if (!new_user) {
        return res.status(400).json({ success: false, error: "Schema failed" });
      }
      new_user
        .save()
        .then(() => {
          return res.status(201).send(new_user);
        })
        .catch((error) => {
          return res.status(404).send("Error: New user registration not done.");
        });
    } else {
      res.status(404).send("User already exits.");
    }
  });
};
