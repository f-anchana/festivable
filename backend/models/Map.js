const mongoose = require('mongoose');

const iconSchema = new mongoose.Schema({
  type: { type: String, required: true },
  latlng: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  }
}, { _id: false });

const polygonSchema = new mongoose.Schema({
  coords: {
    type: [[Number]], // tableau de [lat, lng]
    required: true
  },
  style: {
    color: { type: String, required: true },
    fillColor: { type: String, required: true },
    fillOpacity: { type: Number, required: true }
  },
  name: { type: String } // optionnel
}, { _id: false });

const mapSchema = new mongoose.Schema({
  festivalId: { type: String, required: true, unique: true },
  center: {
    type: [Number], // [lat, lng]
    validate: [arr => arr.length === 2, 'Center must have [lat, lng]'],
    required: true
  },
  zoom: { type: Number, required: true },
  polygons: [polygonSchema],
  icons: [iconSchema],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Map', mapSchema);