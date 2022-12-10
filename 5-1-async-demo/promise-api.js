const p = Promise.resolve({id: 10})
p.then(res => {
  console.log("res", res)})