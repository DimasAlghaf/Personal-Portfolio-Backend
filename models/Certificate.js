const mongoose = require('mongoose');

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: { type: String, required: true },
  fileUrl: { type: String, required: true },
  date: { type: String, required: true },
  icon: { type: String, required: true },
});

certificateSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
certificateSchema.set('toJSON', { virtuals: true });

const Certificate = mongoose.model('Certificate', certificateSchema);
module.exports = Certificate;
