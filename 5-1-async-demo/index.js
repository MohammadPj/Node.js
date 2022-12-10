console.log("Before");

const getUser = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = { username: "mohammad" };
      resolve(user);
    }, 1000);
  });
}


function getRepo() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const repo = ["repo1", "repo2", "repo3"];
      resolve(repo);
    }, 2000);
  })
}

function getCommits() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const commits = [1, 2, 3];
      resolve(commits);
    }, 2000);
  })
}

getUser.then(res => {
  console.log("res", res)
})

console.log("After");
