const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const GallerySchema = new mongoose.Schema({
  festivalId: { type: Types.ObjectId, ref: 'Festival', required: true, unique: true },
  images: [String], // chemin/URL du fichier image
});

module.exports = mongoose.model('Gallery', GallerySchema, 'gallery');