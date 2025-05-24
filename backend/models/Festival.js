const mongoose = require('mongoose');

const PricesSchema = new mongoose.Schema({
    type: String,
    amount: Number
});

const RecruitmentSchema = new mongoose.Schema({
    position: String,
    start_date: Date,
    end_date: Date,
    paid: Boolean,
    contact_email: String
});

const AccessibilitySchema = new mongoose.Schema({
    wheelchair_accessible: Boolean,
    disabled_parking_available: Boolean
    // Ajouter d'autres champs ici
});

const FestivalSchema = new mongoose.Schema({
    title: String,
    start_date: Date,
    end_date: Date,
    address: String,
    description: String,
    link: String,
    prices: [PricesSchema],
    recruitments: [RecruitmentSchema],
    accessibility: AccessibilitySchema,
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organizateur',
        required: true
    },
    valid: Boolean,
    pictoaccess: Boolean
});

// Ajouter images

// Ajouter map

module.exports = mongoose.model('Festival', FestivalSchema, 'festivals');