import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  userId: String,
  text: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema({
  text: { type: String, required: true },
  desc: String,
  img: String,
  user: String,
  likes: [String],
  comments: [commentSchema],
}, { timestamps: true });

export default mongoose.model('Post', postSchema);
