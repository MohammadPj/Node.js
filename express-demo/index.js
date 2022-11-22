const express = require("express")

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World")
})

app.get("/api/courses", (req, res) => {
  res.send([1,2,3,4])
})

app.get("/api/courses/:year/:month", (req, res) => {
  res.send(req.query )
  // res.send(req.params )
})

//PORT
const port = process.env.PORT || 3000


app.listen(port, () => {
  console.log(`listening on port ${port}...`)
})