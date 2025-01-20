const asyncHandler = require("express-async-handler");
const User = require("../models/User");

////////////////////////////////////////////////////////////
// Post

const createNewUser = asyncHandler(async (req, res) => {
  const user = req.body;
  console.log(user);

  if (!user) {
    res.status(400).send("Your information not complete boyaa");
  }

  const duplicate = await User.findOne(user.email)
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();
  if (duplicate !== null) {
    console.log("the user is ready excest");
  }
  const userObject = user;
  const newUser = await User.create(userObject);
  console.log(newUser);

  if (newUser) {
    res.status(200).send(newUser);
  } else {
    res.status(400).send("Cant add user");
  }
});

////////////////////////////////////////////////////////////

//Get

const getAllUsers = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

////////////////////////////////////////////////////////////

//Update

const updateUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

////////////////////////////////////////////////////////////

//Delete

const deleteUser = asyncHandler(async (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = {
  createNewUser,
  getAllUsers,
  updateUser,
  deleteUser,
};
