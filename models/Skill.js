const mongoose = require('mongoose');

const skillItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  icon: { type: String, required: true },
});

const skillSchema = new mongoose.Schema({
  category: { type: String, required: true },
  items: { type: [skillItemSchema], required: true },
});

const Skill = mongoose.model('Skill', skillSchema);
module.exports = Skill;
