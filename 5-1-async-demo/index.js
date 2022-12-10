console.log("Before");

const getUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = { username: "mohammad" };
      // resolve(user);
      reject(new Error("Error from database"))
    }, 1000);
  });
};

function getRepo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const repo = ["repo1", "repo2", "repo3"];
      resolve(repo);
    }, 2000);
  });
}

function getCommits() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const commits = [1, 2, 3];
      resolve(commits);
    }, 2000);
  });
}

getUser()
  .then((user) => {
    console.log("user", user);
    return getRepo();
  })
  .then((repo) => {
    console.log("repo", repo);
    return getCommits();
  })
  .then((commits) => {
    console.log("commits", commits);
  }).catch(error => {
  console.log("any error accord", error)
})

console.log("After");
