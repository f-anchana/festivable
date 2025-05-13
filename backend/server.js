const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/routes');

const app = express();
const port = 3000;

// Connexion à MongoDB 
connectDB();

// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})