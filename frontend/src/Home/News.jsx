import { useState, useCallback, memo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeart, FaCommentDots } from "react-icons/fa";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// 🔹 API
const fetchTodos = async () => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/auth/todoGet`);
  if (!res.ok) throw new Error("Failed to fetch");
  return res.json();
};

const likePost = async ({ postId, userId }) => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/auth/todoLike/${postId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId }),
  });
  return res.json();
};

const commentPost = async ({ postId, userId, comment }) => {
  const res = await fetch(
    `${VITE_BACKEND_URL}/api/auth/todoComment/${postId}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, comment }),
    },
  );
  return res.json();
};

// 🔹 Spinner
const Spinner = () => (
  <div className="flex justify-center py-10">
    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// 🔹 Skeleton
const Skeleton = () => (
  <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
    {[1, 2, 3].map((i) => (
      <div key={i} className="bg-white p-4 rounded shadow animate-pulse">
        <div className="h-48 bg-gray-300 rounded mb-4"></div>
        <div className="h-4 bg-gray-300 w-3/4 mb-2"></div>
        <div className="h-3 bg-gray-200 w-full"></div>
      </div>
    ))}
  </div>
);

// 🔹 Post Card (memoized)
const PostCard = memo(
  ({
    post,
    userId,
    likeMutation,
    commentMutation,
    toggleCommentBox,
    commentBoxes,
    commentTexts,
    setCommentTexts,
  }) => {
    const likeCount = post.likes?.length || 0;
    const commentCount = post.comments?.length || 0;

    const created = new Date(post.createdAt);
    const day = created.getDate();
    const month = created.toLocaleString("default", { month: "short" });

    const isCommentOpen = commentBoxes[post._id];
    const commentInput = commentTexts[post._id] || "";

    const handleLike = () => {
      likeMutation.mutate({ postId: post._id, userId });
    };

    const handleSubmit = () => {
      if (!commentInput.trim()) return;
      commentMutation.mutate({
        postId: post._id,
        userId,
        comment: commentInput,
      });
      setCommentTexts((prev) => ({ ...prev, [post._id]: "" }));
    };

    return (
      <div className="bg-white rounded shadow hover:shadow-xl transition duration-300">
        <img
          src={post.img || "https://via.placeholder.com/400x300"}
          alt="Post"
          loading="lazy"
          className="w-full h-64 object-cover"
        />

        <div className="p-6">
          <div className="flex gap-4 mb-4 items-center">
            <div className="bg-orange-500 text-white px-4 py-2 rounded text-center">
              <p className="text-xl font-bold">{day}</p>
              <p className="text-sm">{month}</p>
            </div>
            <h3 className="text-lg font-semibold line-clamp-2">{post.text}</h3>
          </div>

          {/* Actions */}
          <div className="flex gap-6 text-sm text-gray-600 mb-3">
            <button
              onClick={handleLike}
              className="flex items-center gap-1 hover:text-red-500 transition"
            >
              <FaHeart className="text-red-500" />
              {likeCount}
            </button>

            <button
              onClick={() => toggleCommentBox(post._id)}
              className="flex items-center gap-1 hover:text-blue-500 transition"
            >
              <FaCommentDots />
              {commentCount}
            </button>
          </div>

          <p className="text-sm text-gray-700 mb-3 line-clamp-3">
            {post.desc || "No description"}
          </p>

          {/* Comments */}
          {isCommentOpen && (
            <div className="space-y-3">
              <textarea
                value={commentInput}
                onChange={(e) =>
                  setCommentTexts((prev) => ({
                    ...prev,
                    [post._id]: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded resize-none text-sm"
                rows="2"
                placeholder="Write a comment..."
              />

              <button
                onClick={handleSubmit}
                className="px-3 py-1 bg-orange-500 text-white rounded hover:bg-orange-600 text-sm"
              >
                Post
              </button>

              {post.comments?.slice(-3).map((c, i) => (
                <div key={i} className="bg-gray-100 p-2 rounded text-sm">
                  <b>{c.userId}:</b> {c.text}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  },
);

// 🔹 Main Component
const News = ({ id }) => {
  const queryClient = useQueryClient();
  const [commentBoxes, setCommentBoxes] = useState({});
  const [commentTexts, setCommentTexts] = useState({});
  const userId = "demo-user";

  const {
    data: todos = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
    staleTime: 1000 * 60 * 5,
  });

  // 🔥 Optimistic Like
  const likeMutation = useMutation({
    mutationFn: likePost,
    onMutate: async ({ postId }) => {
      await queryClient.cancelQueries(["todos"]);
      const prev = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (old) =>
        old.map((p) =>
          p._id === postId ? { ...p, likes: [...(p.likes || []), userId] } : p,
        ),
      );

      return { prev };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(["todos"], context.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries(["todos"]);
    },
  });

  const commentMutation = useMutation({
    mutationFn: commentPost,
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });

  const toggleCommentBox = useCallback((postId) => {
    setCommentBoxes((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  }, []);

  if (isLoading)
    return (
      <>
        <Spinner />
        <Skeleton />
      </>
    );

  if (isError)
    return <div className="text-center text-red-500">{error.message}</div>;

  return (
    <section id={id} className="py-16 px-4 bg-gray-100">
      <h2 className="text-4xl font-bold text-center mb-10">
        Latest <span className="text-orange-500">News</span>
      </h2>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {todos.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            userId={userId}
            likeMutation={likeMutation}
            commentMutation={commentMutation}
            toggleCommentBox={toggleCommentBox}
            commentBoxes={commentBoxes}
            commentTexts={commentTexts}
            setCommentTexts={setCommentTexts}
          />
        ))}
      </div>
    </section>
  );
};

export default memo(News);
