// routes/events.js
import Event from '../models/event.model.js';

export const newEvent = async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add event' });
  }
};

// Get all events
export const getEvent = async (req, res) => {
  try {
    const events = await Event.find().sort({ _id: -1 }); // latest first
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

// DELETE /api/events/:id
export const deleteEvent = async (req, res) => {
  try {
    const deleted = await Event.findByIdAndDelete(req.params.id);
    res.json(deleted);
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

// PUT /api/events/:id
export const updateEvent = async (req, res) => {
  try {
    const updated = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update event' });
  }
};

