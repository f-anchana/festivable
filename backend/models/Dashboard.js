const mongoose = require('mongoose');

// Schéma et modèle de user
const dashboardSchema = new mongoose.Schema({
    organization_name: String,
    name: String,
    email: String,
    phone_number: String,
    password: String,
    role: {
        type: String,
        enum: ['organizer', 'admin'],  // Liste des valeurs possibles, ça limite les erreurs
        required: true,         // Ce champ doit obligatoirement être rempli
        default: 'organizer'    // Si tu ne précises pas, la valeur par défaut sera 'organizer'
    }
});

module.exports = mongoose.model('Dashboard', dashboardSchema, 'dashboards');