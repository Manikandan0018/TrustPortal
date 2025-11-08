import Post from '../models/post.model.js';
import cloudinary from '../cloudinary.js';
import streamifier from 'streamifier';

const streamUpload = fileBuffer => new Promise((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder: 'createdPost' },
    (error, result) => error ? reject(error) : resolve(result)
  );
  streamifier.createReadStream(fileBuffer).pipe(stream);
});

export const textController = async (req, res) => {
  try {
    const { text, desc, user } = req.body;
    if (!text || !user) return res.status(400).json({ error: 'Text and user are required' });

    const img = req.file ? (await streamUpload(req.file.buffer)).secure_url : null;

    const post = await new Post({ text, desc, img, user });
    await post.save();

    return res.status(201).json(post);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Failed to create post' });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Post.find();
    res.status(200).json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.status(200).json({ message: 'Deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Delete failed' });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const { text, desc } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.text = text || post.text;
    post.desc = desc || post.desc;

    if (req.file) {
      post.img = (await streamUpload(req.file.buffer)).secure_url;
    }

    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Update failed' });
  }
};

export const todoLike = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const idx = post.likes.indexOf(userId);
    if (idx === -1) post.likes.push(userId);
    else post.likes.splice(idx, 1);

    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Like failed' });
  }
};

export const todoComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, comment } = req.body;
    if (!comment) return res.status(400).json({ error: 'Comment text required' });

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push({ userId, text: comment, timestamp: new Date() });
    await post.save();
    return res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Comment failed' });
  }
};
