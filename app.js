const express = require('express');
const cowsay = require('cowsay');
const app = express()
const port = 3000

// Leer fichero .env
require('dotenv').config()

// Rutas
const entriesRoutes = require('./routes/entries.routes');
const authorsRoutes = require('./routes/authors.routes');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to my server!')
}); 

// Rutas
//API
app.use('/api/entries', entriesRoutes);
app.use('/api/authors', authorsRoutes);


app.listen(port, () => {
  console.log(
    cowsay.say({
      text: `Example app listening on port http://localhost:3000`,
      f: "nyan",
    })
  );
});

module.exports = app;