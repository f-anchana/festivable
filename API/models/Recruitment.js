const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const RecruitmentSchema = new Schema({
  festivalId: { type: Types.ObjectId, ref: 'Festival', required: true, unique: true },
  recruitments: [
    {
      position: String,
      start_date: Date,
      end_date: Date,
      paid: Boolean,
      contact_email: String,
      job_posting_url: String,
      description: String,
    }
  ],
});

module.exports = mongoose.model('Recruitment', RecruitmentSchema, 'recruitments');