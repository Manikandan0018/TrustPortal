// models/Event.js
import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  title: String,
  date: String, // e.g. "13"
  month: String, // e.g. "July"
  description: String,
});

export default mongoose.model('Event', eventSchema);
