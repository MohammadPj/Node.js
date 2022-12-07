const Joi = require("joi");
const express = require("express");

const app = express();
app.use(express.json());

const courses = [
  { id: 1, name: "course1" },
  { id: 2, name: "course2" },
  { id: 3, name: "course3" },
  { id: 4, name: "course4" },
];

const validateCourse = (course) => {
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return schema.validate(course);
};

// -----------------------------------------  Get ------------------------------------------------

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find((course) => course.id === +req.params.id);

  if (!course) return res.status(404).send("The course with the given ID was not found!!! ");

  res.send(course);
});

// -----------------------------------------  Post ------------------------------------------------
app.post("/api/courses", async (req, res) => {
  //  Validate
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //  Create new course
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  //  Add new course
  courses.push(course);
  res.send(course);
});

// -----------------------------------------  Put ------------------------------------------------

app.put("/api/courses/:id", (req, res) => {
  //  Lookup the course
  //  if not exist, return 404
  const course = courses.find((c) => c.id === +req.params.id);
  if (!course) return res.status(404).send("The course with the given ID was not found!!! ");

  //  Validate
  //  if invalid return, 400 bad request
  const { error } = validateCourse(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //Update the course
  course.name = req.body.name;
  res.send(course);
});

// -----------------------------------------  Delete ------------------------------------------------

app.delete("/api/courses/:id", (req, res) => {
  //  Look up the course
  //  if not existed, 404

  const course = courses.find((c) => c.id === +req.params.id);
  if (!course) return res.status(404).send("course not found");

  //  Delete
  const index = courses.findIndex((c) => c.id === +req.params.id);
  courses.splice(index, 1);

  //  Return the same course
  res.send(course);
});

// ------------------------------------------------------------------------------------------------

//PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});
