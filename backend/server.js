import express from 'express'
import connectDB from './config/db.js'
import cookieSession from 'cookie-session'
import passport from 'passport'
import './models/User.js'
import './models/Purchase.js'
import './models/PurchaseCategory.js'
import './models/Account.js'
import './models/AccountUpdate.js'
import './models/Mood.js'
import configPassport from './config/passport.js'
import authRoutes from './routes/authRoutes.js'
import purchaseRoutes from './routes/purchaseRoutes.js'
import purchaseCategoryRoutes from './routes/purchaseCategoryRoutes.js'
import accountRoutes from './routes/accountRoutes.js'
import accountUpdateRoutes from './routes/accountUpdateRoutes.js'
import moodRoutes from './routes/moodRoutes.js'
import { s3Upload, s3Delete } from './controllers/s3Controller.js'
import { protect } from './middleware/authMiddleware.js'
import dotenv from 'dotenv'
import path from 'path'
import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

const PORT = process.env.PORT ?? 80

connectDB()

configPassport()

const app = express()

// Body parser: fixes req.body === undefined
app.use(express.json())

app.use(
  cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
  })
)

app.use(passport.initialize())
app.use(passport.session()) // Authenticate session for passport that we created

app.use('/api/finances/auth', authRoutes)

app.use('/api/finances/purchases', purchaseRoutes)
app.use('/api/finances/purchase-categories', purchaseCategoryRoutes)
app.use('/api/finances/accounts', accountRoutes)
app.use('/api/finances/account-updates', accountUpdateRoutes)
app.use('/api/finances/moods', moodRoutes)

app.post('/api/finances/s3', protect, s3Upload)
app.delete('/api/finances/s3', protect, s3Delete)

app.get('/api/finances/health', (req, res) => {
  res.send('API server for Finances is healthy!')
})

app.get('*', (req, res) => {
  res.send(
    `API server for Finances running in ${process.env.NODE_ENV} on port ${PORT}...`
  )
})

// Custom error middleware
app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () =>
  console.log(
    `API server for Finances running in ${process.env.NODE_ENV} on port ${PORT}...`
  )
)

// const __dirname = path.resolve()
// if (process.env.NODE_ENV === 'production') {
//   // Express will serve up production assets like our main.js or main.css file
//   app.use(express.static(path.join(__dirname, '/frontend/build')))

//   // Express will serve up the index.html file if it doesn't recognize the route
//   app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
//   })
// } else {
//   app.get('/', (req, res) => {
//     res.send('API is running...')
//   })
// }

// const PORT = process.env.PORT || 5000

// app.listen(
//   PORT,
//   console.log(
//     `Server running in ${process.env.NODE_ENV} on port ${PORT}...`.yellow.bold
//   )
// )
