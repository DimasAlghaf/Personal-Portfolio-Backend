const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Load env vars
dotenv.config();

// Load models
const Project = require('./models/Project');
const Certificate = require('./models/Certificate');
const Skill = require('./models/Skill');

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
  family: 4 // Force IPv4, helps with DNS resolution issues
});

// Read JSON files
const projects = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'projects.json'), 'utf-8'));
const certificates = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'certificates.json'), 'utf-8'));
const skills = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'skills.json'), 'utf-8'));

const importData = async () => {
  try {
    await Project.deleteMany();
    await Certificate.deleteMany();
    await Skill.deleteMany();

    // Map projects and certificates to remove 'id' if present, because Mongoose generates '_id'
    // But since the schema accepts them and ignores 'id', we just pass it as is.
    
    await Project.insertMany(projects);
    await Certificate.insertMany(certificates);
    await Skill.insertMany(skills);

    console.log('Data successfully imported to MongoDB!');
    process.exit();
  } catch (error) {
    console.error(`Error importing data: ${error}`);
    process.exit(1);
  }
};

importData();
