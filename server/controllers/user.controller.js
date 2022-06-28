const User = require("../models/users.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT_SECRET;
const Smoothie = require("../models/smoothies.model");

// registration:
const register = async (req, res) => {
  try {
    const user = new User(req.body);
    const newUser = await user.save();
    console.log("New User", newUser);
    const userToken = jwt.sign(
      {
        _id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
      },
      SECRET
    );
    res
      .status(201)
      .cookie("userToken", userToken, {
        expires: new Date(Date.now() + 259200000),
      })
      .json({
        successMessage: "user created",
        user: {
          _id: newUser._id,
          email: newUser.email,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
        },
      });
  } catch (e) {
    console.log("Error Creating User", e);
    res.status(400).json(e);
  }
};

//login:
const login = async (req, res) => {
  const userDoc = await User.findOne({ email: req.body.email });
  if (!userDoc) {
    res.status(400).json({ message: "Invalid Login!" });
  } else {
    try {
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        userDoc.password
      );
      if (!isPasswordValid) {
        res.status(400).json({ message: "Invalid Login!" });
      } else {
        const userToken = jwt.sign(
          {
            _id: userDoc._id,
            email: userDoc.email,
            firstName: userDoc.firstName,
            lastName: userDoc.lastName,
          },
          SECRET
        );
        res
          .status(201)
          .cookie("userToken", userToken, {
            expires: new Date(Date.now() + 259200000),
          })
          .json({
            successMessage: "user logged in!",
            user: {
              _id: userDoc._id,
              email: userDoc.email,
              firstName: userDoc.firstName,
              lastName: userDoc.lastName,
            },
          });
      }
    } catch (e) {
      console.log("Login Error", e);
      res.status(400).json({ message: "Invalid Login" });
    }
  }
};

const logout = (req, res) => {
  res.clearCookie("userToken");
  res.json({ message: "You are logged out!" });
};

//getting the current logged in user:
const getLoggedInUser = async (req, res) => {
  try {
    const userPayload = await jwt.verify(req.cookies.userToken, SECRET);
    console.log("USER", userPayload);
    const user = await User.findOne({ _id: userPayload._id });
    res.json(user);
  } catch (e) {
    console.log("Error Finding User!", e);
    res.status(400).json({ e });
  }
};

const updateUsersWithFavorites = (req, res) => {
  const user = jwt.verify(req.cookies.userToken, SECRET);
  User.findByIdAndUpdate(
    { _id: user._id },
    { $push: { favoritedSmoothies: [req.body.smoothieId] } },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate(
      "favoritedSmoothies",
      "_id method size liquid quantity fruits veggies extras"
    )
    .then((user) => {
      Smoothie.findByIdAndUpdate(
        { _id: req.body.smoothieId },
        { favorited: true }
      ).then((user) => {
        res.json(user);
      });
    })
    .catch((err) => {
      console.log("error message", err);
      res.status(400).json({
        message: "Something went wrong favoriting a smoothie!",
        error: err,
      });
    });
};

const getUserFavoritedSmoothies = (req, res) => {
  const user = jwt.verify(req.cookies.userToken, SECRET);
  User.findById(user._id)
    .populate(
      "favoritedSmoothies",
      "_id method size liquid quantity fruits veggies extras"
    )
    .then((user) => {
      console.log("Success!");
      res.json(user);
    })
    .catch((err) => {
      console.log("error message", err);
      res.status(400).json({
        message: "Something went wrong finding favorited smoothies",
        error: err,
      });
    });
};

module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
  updateUsersWithFavorites,
  getUserFavoritedSmoothies,
};
