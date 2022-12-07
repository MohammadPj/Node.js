console.log("Before");

getUser("10", (user) => {

  console.log(user)
  getRepo((repo) => {
    console.log(repo)
  })
})



console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from database...");
    callback({ id: id, username: "moh" })
  }, 2000);
}

function getRepo(callback) {
  setTimeout(() => {
    const repo = ['repo1', 'repo2', 'repo3']
    callback(repo)
  }, 2000)
}