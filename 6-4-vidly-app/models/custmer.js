const mongoose = require('mongoose')
const joi = require("joi")

const Customer = mongoose.model("Customer", new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 50
  },
  isGold: {
    type: Boolean,
    default: false
  },
  phoneNumber: {
    type: String,
    required: true,
    minLength: 9,
    maxLength: 11
  }
}))

const validateCustomer = (customer) => {
  const schema = joi.object({
    name: joi.string().required().min(3).max(50),
    isGold: joi.boolean(),
    phoneNumber: joi.string().required().min(9).max(11)
  })

  return schema.validate(customer)
}

// exports.Customer = Customer
// exports.validateCustomer = validateCustomer
module.exports = {Customer, validateCustomer}