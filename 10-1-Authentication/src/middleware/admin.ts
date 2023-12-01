const isAdmin = (req: any, res: any, next: any) => {
  if(!req.user.isAdmin) return res.status(403).send('Access denied')
  next()
};

module.exports = isAdmin;
