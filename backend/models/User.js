const mongoose = require('mongoose');

// Schéma et modèle de user
const userSchema = new mongoose.Schema({
  pseudo: String,
  email: String,
  phone: String,
  password: String,
  disability: String,
  type_user: String,
  pictoacess: Boolean,
  firstname: String,
  lastname: String
});

module.exports = mongoose.model('User', userSchema, 'users');