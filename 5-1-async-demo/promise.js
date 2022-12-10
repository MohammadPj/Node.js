const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    const condition = false;
    if (condition) {
      resolve("data from backend");
    } else {
      reject(new Error("Error from backend"));
    }
  }, 1000);
});

p.then((res) => {
  console.log("res", res);
}).catch((error) => {
  console.log("error", error);
});
