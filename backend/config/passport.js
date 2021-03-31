import passport from 'passport'
import GoogleStrategy from 'passport-google-oauth20'
import mongoose from 'mongoose'

const User = mongoose.model('User')

// Is ran after auth/google/callback. Places the MongoDB _id in the session
passport.serializeUser((user, done) => {
  done(null, user.id) // First argument is error object, id is the MongoDB _id
})

// Takes the MongoDB _id from the session and retrieves the User object
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id)
  done(null, user)
})

export default () =>
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
      async (accessToken, refreshToken, profile, done) => {
        // console.log('Access token:', accessToken)
        // console.log('Refresh token:', refreshToken)
        // console.log('Profile:', profile)
        const existingUser = await User.findOne({ googleId: profile.id })

        if (existingUser) {
          return done(null, existingUser)
        }

        const user = await new User({
          googleId: profile.id,
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          email: profile.emails[0].value,
        }).save()

        done(null, user)
      }
    )
  )
