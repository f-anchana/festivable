const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const commentsSchema = new Schema({
    userId: { type: Types.ObjectId, required: true, ref: 'User' },
    festivalId: { type: Types.ObjectId, required: true, ref: 'Festival' },
    comment: { type: String, required: true },
    date: { type: Date, default: Date.now },
    disability: { type: String }
});

module.exports = mongoose.model('Comment', commentsSchema, 'comments');