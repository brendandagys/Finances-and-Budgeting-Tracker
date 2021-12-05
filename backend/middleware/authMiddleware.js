export const protect = (req, res, next) => {
  // console.log(req.user)
  if (!req.user) {
    res.status(401)
    throw new Error('Please log in')
  }

  next()
}
