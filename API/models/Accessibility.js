const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const accessibilitySchema = new Schema({
  festivalId: { type: Types.ObjectId, required: true },
  answers: {
    type: Map,
    of: Boolean,
    default: {},
  },
  pictograms: {
    type: Map,
    of: Boolean,
    default: {},
  },
});

module.exports = mongoose.model('Accessibility', accessibilitySchema, 'accessibility');