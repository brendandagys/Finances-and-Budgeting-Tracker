import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import mongoose from 'mongoose'
import User from '../models/User.js'

const configPassport = () =>
  passport.use(
    new GoogleStrategy.Strategy(
      {
        clientID:
          process.env.NODE_ENV === 'production'
            ? process.env.GOOGLE_CLIENT_ID_PROD
            : process.env.GOOGLE_CLIENT_ID_DEV,
        clientSecret:
          process.env.NODE_ENV === 'production'
            ? process.env.GOOGLE_CLIENT_SECRET_PROD
            : process.env.GOOGLE_CLIENT_SECRET_DEV,
        callbackURL: '/auth/google/callback',
      },
      (accessToken, refreshToken, profile, done) => {
        // console.log('Access token:', accessToken)
        // console.log('Refresh token:', refreshToken)
        // console.log('Profile:', profile)
        new User({
          googleId: profile.id,
          name: profile.name,
          email: profile.email,
        }).save()
      }
    )
  )

export default configPassport
