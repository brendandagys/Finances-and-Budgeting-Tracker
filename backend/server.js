const express = require('express')

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

app.listen(5000, console.log('Server running on port 5000'))
