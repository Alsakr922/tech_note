const mongoose = require("mongoose");
const bcrypt = require("bcryptjs")

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 8,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    unique: true,
  },
  roles: {
    type: [String],
    default: ["employee"],
  },
  active: {
    type: Boolean,
    default: true,
  },
});
//////////////////////////////////////////////////
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//////////////////////////////////////////////////
// userSchema.virtual("notes", {
//   ref: "Note",
//   localField: "_id",
//   foreignField: "owner",
// });
//////////////////////////////////////////////////
const User = mongoose.model("User", userSchema);

module.exports = User;
