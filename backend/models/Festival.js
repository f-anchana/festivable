const mongoose = require('mongoose');

const PricesSchema = new mongoose.Schema({
    type: String,
    amount: Number
});

const FestivalSchema = new mongoose.Schema({
    title: String,
    start_date: Date,
    end_date: Date,
    address: String,
    description: String,
    link: String,
    prices: [PricesSchema],
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

module.exports = mongoose.model('Festival', FestivalSchema, 'festivals');