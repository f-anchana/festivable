const mongoose = require('mongoose');

// Schéma et modèle de user
const organizationSchema = new mongoose.Schema({
    organization_name: String,
    name: String,
    email: String,
    phone_number: String,
    password: String
});

module.exports = mongoose.model('Organization', organizationSchema, 'organizations');