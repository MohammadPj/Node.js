const error = (error: any, req: any, res: any, next: any) => {
  res.status(500).send('something failed')
  next()
};

module.exports = error;
