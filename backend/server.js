import express from 'express'
import connectDB from './config/db.js'
import cookieSession from 'cookie-session'
import passport from 'passport'
import './models/User.js'
import configPassport from './config/passport.js'
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'
import colors from 'colors'
import path from 'path'

dotenv.config()

connectDB()

configPassport()

const app = express()

app.use(
  cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
)

app.use(passport.initialize())
app.use(passport.session()) // Authenticate session for passport that we created

authRoutes(app)

// app.get('/', (req, res) => {
//   res.send('Server is running!')
// })

app.get('/api/purchases', (req, res) => {
  res.json([
    { purchase_1: 'Bread' },
    { purchase_2: 'Eggs' },
    { purchase_3: 'Milk' },
  ])
})

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets like our main.js or main.css file
  app.use(express.static('client/build'))
  // Express will serve up the index.html file if it doesn't recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}...`.yellow.bold
  )
)
