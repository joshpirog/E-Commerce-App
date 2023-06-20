const express = require('express')
require('dotenv').config()

const loaders = require('./loaders');
const app = express()
const port = 4000


async function startServer() {
  app.get('/', (req, res) => {
    res.send('Hello World!');
  })
  
  loaders(app);
  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  })
}

startServer();