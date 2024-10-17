const express = require('express')
const app = express()
require('dotenv').config()
const loaders = require('./loaders')
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Init application loaders
loaders(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})