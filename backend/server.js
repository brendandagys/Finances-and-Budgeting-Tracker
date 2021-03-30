import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const app = express()

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
