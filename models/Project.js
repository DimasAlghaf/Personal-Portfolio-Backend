const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  technologies: { type: [String], required: true },
});

// Since the frontend is expecting an 'id', we can add a virtual
projectSchema.virtual('id').get(function() {
  return this._id.toHexString();
});
projectSchema.set('toJSON', { virtuals: true });

const Project = mongoose.model('Project', projectSchema);
module.exports = Project;
