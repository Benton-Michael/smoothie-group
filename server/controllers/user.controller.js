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
          createdAt: newUser.createdAt,
          updatedAt: newUser.updatedAt,
          cart: newUser.cart,
          ordered: newUser.ordered
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
            createdAt: userDoc.createdAt,
            updatedAt: userDoc.updatedAt,
            cart: userDoc.cart,
            ordered: userDoc.ordered,
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

const updateUsersWithOrders = (req, res) => {
  const user = jwt.verify(req.cookies.userToken, SECRET);
  User.findByIdAndUpdate(
    { _id: user.cart._id },
    { $push: { orderedSmoothies: req.body.cart } },
    {
      new: true,
      runValidators: true,
    }
  )
    .populate(
      "orderedSmoothies",
      "_id method size liquid quantity fruits veggies extras"
    )
    .then((user) => {
      Smoothie.findByIdAndUpdate(
        { _id: req.body.smoothieId },
        { ordered: true }

      )
      // console.log(user);
      .then((user) => {
        console.log(user);
        res.json(user);
      });
    })
    .catch((err) => {
      console.log("error message", err);
      res.status(400).json({
        message: "Something went wrong ordered a smoothie!",
        error: err,
      });
    });
};

const getUserOrderedSmoothies = (req, res) => {
  const user = jwt.verify(req.cookies.userToken, SECRET);
  User.findById(user._id)
    .populate(
      "orderedSmoothies",
      "_id method size liquid quantity fruits veggies extras name"
    )
    .then((user) => {
      console.log("Success!");
      res.json(user);
    })
    .catch((err) => {
      console.log("error message", err);
      res.status(400).json({
        message: "Something went wrong finding ordered smoothies",
        error: err,
      });
    });
};
const addToCart = (req, res) => {
  const user = jwt.verify(req.cookies.userToken, SECRET);
  console.log("=====add to cart", req.body)
  User.findOneAndUpdate(
    { _id: user._id },
    { "$push": { "cart": req.body.smoothie } },
    { new: true},
  )
  .populate(
    "cart",
    "_id method size liquid quantity fruits veggies extras name"
  ).then((user) => res.json(user))
  .catch(err => res.status(400).json(err));
};


const deleteOneFromCart = (req, res) => {
  const user = jwt.verify(req.cookies.userToken, SECRET);
  console.log("=====Delete to cart", req.body)
  User.findOneAndUpdate(
    { _id: user._id },
    { "$pull": { "cart": req.body.smoothie } },
    { new: true},
  )
  // .populate(
  //   "cart",
  //   "_id method size liquid quantity fruits veggies extras name"
  // )
  .then((user) => res.json(user))
  .catch(err => res.status(400).json(err));
};

const getOneUserCart = (req, res) => {
  const user = jwt.verify(req.cookies.userToken, SECRET);
  User.findById(user._id)
  .populate("cart", "_id name size quantity method extras fruits veggies createdAt")
      .then(oneUser => res.json(oneUser))
      .catch((err) => {
          res.json({ message: 'Something went wrong', error: err })
      });
};

module.exports = {
  register,
  login,
  logout,
  getLoggedInUser,
  updateUsersWithOrders,
  getUserOrderedSmoothies,
  addToCart,
  getOneUserCart,
  deleteOneFromCart,
};
