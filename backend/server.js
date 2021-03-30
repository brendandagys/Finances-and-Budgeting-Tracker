const express = require('express')
const dotenv = require('dotenv')

dotenv.config()

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
  console.log(`Server running in ${process.env.NODE_ENV} on port ${PORT}...`)
)
