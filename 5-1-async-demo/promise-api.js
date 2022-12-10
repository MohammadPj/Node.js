const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async Operation 1 ....");
    resolve(1);
    // reject(new Error("failed"))
  }, 1000);
});

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Async Operation 2 ....");
    resolve(2);
  }, 1000);
});

Promise.all([p1, p2]).then((res) => {
  console.log("res", res);
}).catch(err => {
  console.log("err", err)})