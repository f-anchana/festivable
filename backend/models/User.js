const mongoose = require('mongoose');

const defaultPhotos = [
  'public/profiles/default1.png',
  'public/profiles/default2.png',
  'public/profiles/default3.png',
  'public/profiles/default4.png'
];

// Schéma et modèle de user
const userSchema = new mongoose.Schema({
  pseudo: String,
  email: String,
  phone: String,
  password: String,
  disability: String,
  type_user: String,
  firstname: String,
  lastname: String,
  profile_picture: {
    type: String,
    default: function () {
      // Choisit une photo au hasard dans defaultPhotos
      return defaultPhotos[Math.floor(Math.random() * defaultPhotos.length)];
    }
  }
});

module.exports = mongoose.model('User', userSchema, 'users');