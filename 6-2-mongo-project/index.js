const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup")
const dbDebugger = require("debug")("app:db")


//  middlewares
const log = require("./middleware/logger");
const authentication = require("./middleware/authentication");

//  routes
const genres = require("./routes/courses")
const home = require("./routes/home")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("short"));
  startupDebugger("morgan enabled")
}

// Db work ...
dbDebugger("connected to database...")

app.use(log);
app.use(authentication);

// --------------------------- APIs

app.use("/api/genres", genres)
app.use("/", home)

const port = process.env.PORT || 3000;
app.listen(port, (socket) => {
  console.log(`listening to port ${port}`);
});
