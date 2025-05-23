const mongoose = require('mongoose');

const accessibilitySchema = new mongoose.Schema({
  pseudo: String,
  email: String,
  password: String,
  disability: String,
  type_user: String,
  pictoacess: Boolean,
  firstname: String,
  lastname: String
});

module.exports = mongoose.model('Accessibility', accessibilitySchema, 'accessibility');