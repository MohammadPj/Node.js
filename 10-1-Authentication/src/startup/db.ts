import mongoose from "mongoose";
import winston from "winston";

module.exports = () => {
  mongoose
    .connect("mongodb://127.0.0.1:27017/rental-project")
    .then(() => {
      winston.info('Connected to MongoDB...')
    })

}