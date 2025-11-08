import User from '../models/user.model.js';
import Post from '../models/post.model.js';
import cloudinary from '../cloudinary.js';


export const createPost = async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = '';

    if (req.file) {
      const result = await cloudinary.uploader.upload_stream(
        { resource_type: 'image', folder: 'todos' },
        async (error, result) => {
          if (error) {
            console.error('Cloudinary Error:', error);
            return res.status(500).json({ message: 'Upload failed' });
          }

          imageUrl = result.secure_url;

          const newPost = new Post({
            text: title,
            desc: description,
            img: imageUrl,
            user: 'admin', // Replace with actual user if needed
            likes: [],
            comments: [],
          });

          await newPost.save();
          res.status(201).json(newPost);
        }
      );

      // Write file buffer to Cloudinary stream
      result.end(req.file.buffer);
    } else {
      res.status(400).json({ message: 'Image is required' });
    }
  } catch (err) {
    console.error('Post error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    if (post.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: "Not authorized to delete this post" });
    }

    // Delete image from cloudinary if present (using publicId)
    if (post.imgPublicId) {
      try {
        await cloudinary.uploader.destroy(post.imgPublicId);
      } catch (error) {
        console.error("Cloudinary image delete failed:", error);
        // continue anyway, don't block post deletion
      }
    }

    await Post.findByIdAndDelete(id);

    return res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("Delete post error:", error);
    return res.status(500).json({ error: "Server error" });
  }
};

export const postComment = async (req, res) => {
  try {
    const { text } = req.body;
    const postId = req.params.id;
    const userId = req.user._id;

    if (!text) {
      return res.status(400).json({ error: "Comment text is required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Add comment to post
    post.comments.push({ text, user: userId });
    await post.save();

    // Fetch updated post with populated user info
    const updatedPost = await Post.findById(postId)
      .populate("comments.user", "email username")
      .populate("user", "email username");

    res.status(200).json({
      post: updatedPost,
      message: "Comment added successfully",
    });

  } catch (err) {
    console.error("Post comment error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
};


export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find().sort({ createdAt: -1 })
            .populate({ path: "user", select: '-password' })
            .populate({ path: "comments.user", select: ['-password', '-email'] });

        res.status(200).json(posts);
    } catch (error) {
        console.log(`error in allPosts ${error}`);
        res.status(500).json({ error: "error in AllGetPost" });
    }
};





