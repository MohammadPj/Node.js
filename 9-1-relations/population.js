// simulate relational database by population
// its good for consistency
// if you change an author from Author collection it will change author property of Course collection
const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const Author = mongoose.model('Author', new mongoose.Schema({
  name: String,
  bio: String,
  website: String
}));

const Course = mongoose.model('Course', new mongoose.Schema({
  name: String,
  author: {
    type: mongoose.Schema.Types.ObjectId, // specify type ObjectId to author
    ref: "Author" // specify name of collection
  }
}));

async function createAuthor({name, bio, website}) {
  const author = new Author({
    name, 
    bio, 
    website 
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse({name, author}) {
  const course = new Course({
    name, 
    author
  }); 
  
  const result = await course.save();
  console.log(result);
}

async function listCourses() { 
  const courses = await Course
    .find()
    .populate('author', 'name -_id')
    .select('name author')
  console.log(courses);
}

// createAuthor({name: 'Mosh', bio: "My bio", website: 'My Website'});

// createCourse({name: 'Node Course', author: '63a5ef559f8293a570cf1248'}).then(r => {})

listCourses();