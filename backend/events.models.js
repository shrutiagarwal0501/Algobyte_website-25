const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema({
  date: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imgSrc: { type: String, required: false },
  url: { type: String, required: false },
  category: { 
    type: String, 
    required: true,
    enum: ['upcoming', 'past'],
    default: 'upcoming'
  }
});

const Projectmodel = mongoose.model("Event", projectSchema, "Events");

module.exports = Projectmodel;