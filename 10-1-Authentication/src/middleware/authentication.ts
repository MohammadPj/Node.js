const authentication = (req: any, res: any, next: any) => {
  console.log("Authenticating ...")
  next()
}

module.exports = authentication