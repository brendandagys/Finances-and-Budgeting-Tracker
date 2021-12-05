import express from 'express'
const router = express.Router()

import passport from 'passport'

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
)

router.get(
  '/google/callback',
  passport.authenticate('google', { session: true }),
  (req, res) => {
    res.redirect('/')
  }
)

router.get('/logout', (req, res) => {
  req.logout(), // passport attaches this function to the request object
    res.redirect('/')
})

router.get('/current_user', (req, res) => {
  console.log(req)
  res.send(req.user)
})

export default router
