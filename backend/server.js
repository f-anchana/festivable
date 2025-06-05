require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const routes = require('./routes/routes');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

app.use(cors()); //autoriser les requetes de par tout (mauvaise securité)

// Sert le dossier "uploads" en tant que dossier public
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connexion à MongoDB 
connectDB();

// Dis à Express que tu veux utiliser EJS
app.set('view engine', 'ejs');

// Indique le dossier des vues
app.set('views', path.join(__dirname, 'views'));
app.use('/icones', express.static(path.join(__dirname, 'public/icones')));


// Middleware pour parser les requêtes JSON
app.use(express.json());

// Routes
app.use('/', routes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})