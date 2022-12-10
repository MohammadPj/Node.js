console.log("Before");

const displayUsers = (users) => {
  console.log("repos", users)
  getRepo(displayRepos);
};

const displayRepos = (repos) => {
  console.log("repos", repos)
  getCommits(displayCommits);
};

const displayCommits = (commits) => {
  console.log("commits", commits);
};

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading a user from database...");
    callback({ id: id, username: "moh" });
  }, 2000);
}

function getRepo(callback) {
  setTimeout(() => {
    const repo = ["repo1", "repo2", "repo3"];
    callback(repo);
  }, 2000);
}

function getCommits(callback) {
  setTimeout(() => {
    const commits = [1, 2, 3];
    callback(commits);
  }, 2000);
}

getUser("10",displayUsers);

console.log("After");
