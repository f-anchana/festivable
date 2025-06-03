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

const FestivalSchema = new mongoose.Schema({
    title: String,
    start_date: Date,
    end_date: Date,
    address: String,
    description: String,
    link: String,
    prices: [PricesSchema],
    recruitments: [RecruitmentSchema],
    organizer: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    valid: {
        type: Boolean,
        default: false
    },
    pictoaccess: {
        type: Boolean,
        default: false
    }
});

// Ajouter images



// Ajouter map

module.exports = mongoose.model('Festival', FestivalSchema, 'festivals');