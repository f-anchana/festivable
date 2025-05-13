const mongoose = require('mongoose');

// Schéma et modèle de user
const userSchema = new mongoose.Schema({
  pseudo: String,
  email: String,
  password: String,
});

module.exports = mongoose.model('User', userSchema, 'users');