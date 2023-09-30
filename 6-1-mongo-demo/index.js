const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("could not connect to mongodb...");
  });

// create user Schema
const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  Address: String,
  wishes: [String],
  income: Number
});

// create user model
const User = mongoose.model("Course", userSchema);

// create a user
const user = new User({
  name: "mohammad",
  // phoneNumber: '09905411597',
  // email: 'mbbest145@gmail.com',
  // wishes: ['car', 'movie'],
  income: 20000
})

// save user to database
const createUser = async () => {
  const result = await user.save()
  console.log('result', result)
}
// createUser()

// get users from database
const getUsers = async () => {
  const users = await User
    // .find({phoneNumber: '09905411597', name: 'mohammad}) // filters users with name mohammad and phoneNumber 0990
    // .find({income: {$gt: 1000, $lt: 10000 }}) // filter users with income greater than 1000 and less than 10000
    // .find({income: {$in: [1000, 2000, 5000, 1000]}}) // filter users that have given income
    .find()
    .or([{name: 'mohammad'}, {income: {$gr: 1000}}]) // filter users with name mohammad and income greater than 1000
    .limit(10) // return max 10 item
    .sort({name: -1})// sort base name - 1 is ascending and -1 is descending
    .select({name: 1, phoneNumber: 1}) // only return name and phone number
  console.log(users)
}
getUsers()
