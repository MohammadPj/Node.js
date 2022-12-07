console.log("Before");

console.log(getUser("10"));

console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading a user from database...");
    return { id: id, username: "moh" };
  }, 2000);
}
