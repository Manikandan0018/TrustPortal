import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaHeart, FaCommentDots } from 'react-icons/fa';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

const fetchTodos = async () => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/auth/todoGet`);
  if (!res.ok) throw new Error('Failed to fetch');
  return res.json();
};

const likePost = async ({ postId, userId }) => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/auth/todoLike/${postId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId }),
  });
  return res.json();
};

const commentPost = async ({ postId, userId, comment }) => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/auth/todoComment/${postId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ userId, comment }),
  });
  return res.json();
};

const News = ({id}) => {
  const queryClient = useQueryClient();
  const [commentBoxes, setCommentBoxes] = useState({});
  const [commentTexts, setCommentTexts] = useState({});
  const userId = 'demo-user'; // Replace with real user ID
  
  console.log("BaseUrl is:", VITE_BACKEND_URL);

  const { data: todos = [], isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  const likeMutation = useMutation({
    mutationFn: likePost,
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const commentMutation = useMutation({
    mutationFn: commentPost,
    onSuccess: () => queryClient.invalidateQueries(['todos']),
  });

  const toggleCommentBox = (postId) => {
    setCommentBoxes((prev) => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentSubmit = (postId) => {
    const comment = commentTexts[postId]?.trim();
    if (!comment) return;

    commentMutation.mutate({ postId, userId, comment });
    setCommentTexts((prev) => ({ ...prev, [postId]: '' }));
    setCommentBoxes((prev) => ({ ...prev, [postId]: false }));
  };

  if (isLoading) return <div className="text-center">Loading news...</div>;
  if (isError) return <div className="text-center text-red-600">{error.message}</div>;

  return (
    <section id={id} className="py-16 px-4 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10">
        Latest <span className="text-orange-500">News</span>
      </h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {todos.map((post) => {
          const imageUrl = post.img || "https://via.placeholder.com/400x300";
          const likeCount = Array.isArray(post.likes) ? post.likes.length : 0;
          const commentCount = Array.isArray(post.comments)
            ? post.comments.length
            : 0;
          const isCommentOpen = commentBoxes[post._id];
          const commentInput = commentTexts[post._id] || "";

          const created = new Date(post.createdAt);
          const day = created.getDate();
          const month = created.toLocaleString("default", { month: "short" });

          return (
            <div
              key={post._id}
              className="bg-white rounded shadow hover:shadow-xl transition"
            >
              <img
                src={imageUrl}
                alt="Post"
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <div className="flex gap-4 mb-4 items-center">
                  <div className="bg-orange-500 text-white px-4 py-2 text-center rounded">
                    <p className="text-xl font-bold">{day}</p>
                    <p className="text-sm">{month}</p>
                  </div>
                  <h3 className="text-lg font-semibold">{post.text}</h3>
                </div>

                <div className="flex gap-6 text-sm text-gray-600 mb-3 cursor-pointer">
                  <p
                    className="flex items-center gap-1 hover:text-red-500"
                    onClick={() =>
                      likeMutation.mutate({ postId: post._id, userId })
                    }
                  >
                    <FaHeart className="text-red-500" /> {likeCount} Likes
                  </p>

                  <p
                    className="flex items-center gap-1 hover:text-blue-500"
                    onClick={() => toggleCommentBox(post._id)}
                  >
                    <FaCommentDots /> {commentCount} Comments
                  </p>
                </div>

                <p className="text-sm text-gray-700 mb-4">
                  {post.desc || "No description"}
                </p>

                {isCommentOpen && (
                  <div className="space-y-4">
                    {/* Comment textarea + button */}
                    <div className="space-y-2">
                      <textarea
                        value={commentInput}
                        onChange={(e) =>
                          setCommentTexts((prev) => ({
                            ...prev,
                            [post._id]: e.target.value,
                          }))
                        }
                        className="w-full p-2 border rounded resize-none"
                        rows="2"
                        placeholder="Write a comment..."
                      />
                      <button
                        onClick={() => handleCommentSubmit(post._id)}
                        className="px-4 py-1 bg-orange-500 text-white rounded hover:bg-orange-600"
                      >
                        Submit Comment
                      </button>
                    </div>

                    {/* Display last 3 comments */}
                    {post.comments?.length > 0 && (
                      <div className="space-y-2 text-sm text-gray-800">
                        {post.comments.slice(-3).map((c, idx) => (
                          <div key={idx} className="bg-gray-100 p-2 rounded">
                            <span className="font-medium">{c.userId}:</span>{" "}
                            {c.text}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default News;
