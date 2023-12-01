let express = require("express");
import { User, validateUser } from "../models/User";
const lodash = require("lodash");
const bcrypt = require("bcrypt");

const router = express.Router();

// ----------------------------------  Get  --------------------------------------
router.post("/", async (req: any, res: any) => {
  const { value, error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });

  if (!!user) return res.status(400).send("user already registered");

  user = new User(lodash.pick(req.body, ["email", "name", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);

  await user.save();

  res.send(lodash.pick(user, ["name", "email"]));
});

module.exports = router;
