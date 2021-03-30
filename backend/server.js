import express from 'express'
import connectDB from './config/db.js'
import configPassport from './config/passport.js'
import authRoutes from './routes/authRoutes.js'
import dotenv from 'dotenv'
import colors from 'colors'

dotenv.config()

connectDB()
configPassport()

const app = express()

authRoutes(app)

app.get('/', (req, res) => {
  res.send('Server is running!')
})

app.get('/api/purchases', (req, res) => {
  res.json([
    { purchase_1: 'Bread' },
    { purchase_2: 'Eggs' },
    { purchase_3: 'Milk' },
  ])
})

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} on port ${PORT}...`.yellow.bold
  )
)
