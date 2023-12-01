import Joi from "joi";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
const config = require("config");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minLength: 5, maxLength: 25 },
  email: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 255,
    unique: true,
  },
  password: { type: String, required: true, minLength: 3, maxLength: 1024 }, // use npm joi-password-complexity,
});

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id }, // payload of jwt
    config.get("jwtPrivateKey") // private key
  );

  return token
};

const User = mongoose.model("User", userSchema);

const validateUser = (user: any) => {
  const schema = Joi.object({
    name: Joi.string().required().min(5).max(25),
    email: Joi.string().required().min(5).max(255).email(),
    password: Joi.string().required().min(5).max(1024),
  });

  return schema.validate(user);
};

export { User, validateUser };
