import { useState, useRef, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import UpdateEvent from '../Home/NewEvent';

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
console.log("Backend URL:", VITE_BACKEND_URL); // just to confirm


const Admin = () => {
  const [text, setText] = useState('');
  const [desc, setDesc] = useState('');
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [editId, setEditId] = useState(null);
  const [showNewsDrawer, setShowNewsDrawer] = useState(false);
  const [showEventDrawer, setShowEventDrawer] = useState(false);

  const fileInputRef = useRef(null);
  const userId = '64b48e1f3214584e7efb8e90';
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    const isAdmin = localStorage.getItem('admin');
    if (isAdmin !== 'true') navigate('/admin-login');
  }, [navigate]);

  const { data: todos = [], isLoading, isError, error } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      const res = await fetch(`${VITE_BACKEND_URL}/api/auth/todoGet`);
      if (!res.ok) throw new Error('Failed to fetch todos');
      return res.json();
    },
  });

  const createTodo = useMutation({
    mutationFn: async (formData) => {
      const res = await fetch(`${VITE_BACKEND_URL}/api/auth/todoPost`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to create news');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('News posted successfully!');
      resetForm();
      setShowNewsDrawer(false);
    },
    onError: () => toast.error('Failed to post news'),
  });

  const updateTodo = useMutation({
    mutationFn: async ({ id, formData }) => {
      const res = await fetch(`${VITE_BACKEND_URL}/api/auth/updateTodo/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!res.ok) throw new Error('Failed to update news');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('News updated successfully!');
      resetForm();
      setShowNewsDrawer(false);
    },
    onError: () => toast.error('Failed to update news'),
  });

  const deleteTodo = useMutation({
    mutationFn: async (id) => {
      const res = await fetch(`${VITE_BACKEND_URL}/api/auth/todoDelete/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete news');
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']);
      toast.success('News deleted!');
    },
    onError: () => toast.error('Failed to delete news'),
  });

  const resetForm = () => {
    setText('');
    setDesc('');
    setImage(null);
    setPreviewUrl(null);
    setEditId(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return toast.error('Title is required');

    const formData = new FormData();
    formData.append('text', text);
    formData.append('desc', desc);
    formData.append('user', userId);
    if (image) formData.append('image', image);

    editId
      ? updateTodo.mutate({ id: editId, formData })
      : createTodo.mutate(formData);
  };

  const handleEdit = (todo) => {
    setText(todo.text);
    setDesc(todo.desc || '');
    setEditId(todo._id);
    setPreviewUrl(todo.img || null);
    setImage(null);
    if (fileInputRef.current) fileInputRef.current.value = null;
    setShowNewsDrawer(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  return (
    <>
      <Toaster />
      <div className="min-h-screen bg-gray-100 py-10 px-4 relative">
        {/* Logout Button */}
        <button
          onClick={() => {
            localStorage.removeItem('admin');
            navigate('/');
          }}
          className="absolute top-6 right-6 bg-red-500 px-4 py-1 rounded text-sm text-white"
        >
          Logout
        </button>

        {/* Top Action Buttons */}
        <div className="max-w-5xl mx-auto mt-5 flex justify-end gap-4 mb-6">
          <button
            onClick={() => setShowNewsDrawer(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white font-medium px-4 py-2 rounded-lg shadow"
          >
            + Add News
          </button>
          <button
            onClick={() => setShowEventDrawer(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow"
          >
            + Add Event
          </button>
        </div>

        {/* News Drawer */}
        {showNewsDrawer && (
          <div className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-lg z-50 p-6 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4 text-orange-600">
              {editId ? 'Edit News' : 'Post News'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="News Title"
                className="w-full border rounded px-4 py-2"
              />
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder="News Description"
                rows={4}
                className="w-full border rounded px-4 py-2"
              />
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageChange}
                className="w-full border border-dashed px-4 py-2 rounded"
              />
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="mt-3 w-full h-48 object-cover rounded border"
                />
              )}
              <div className="flex gap-3 mt-4">
                <button
                  type="submit"
                  disabled={createTodo.isPending || updateTodo.isPending}
                  className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded"
                >
                  {editId ? 'Update' : 'Post'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm();
                    setShowNewsDrawer(false);
                  }}
                  className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Event Drawer (Component-based) */}
        {showEventDrawer && (
          <div className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-40 overflow-y-auto p-4">
            <UpdateEvent onClose={() => setShowEventDrawer(false)} />
          </div>
        )}

        {/* News Posts List */}
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-gray-700 mb-4">News Posts</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : isError ? (
            <p className="text-red-500">Error: {error.message}</p>
          ) : (
            <ul className="space-y-6">
              {todos.map((todo) => (
                <li
                  key={todo._id}
                  className="bg-white p-4 rounded shadow hover:shadow-md transition"
                >
                  <h4 className="text-lg font-semibold text-gray-800">{todo.text}</h4>
                  {todo.desc && <p className="text-gray-600 mt-1">{todo.desc}</p>}
                  {todo.img && (
                    <img
                      src={todo.img}
                      alt="News"
                      className="mt-3 rounded-lg w-full max-h-64 object-cover border"
                    />
                  )}
                  <div className="mt-3 flex gap-3">
                    <button
                      onClick={() => handleEdit(todo)}
                      className="px-4 py-1 bg-yellow-500 text-white rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTodo.mutate(todo._id)}
                      disabled={deleteTodo.isPending}
                      className="px-4 py-1 bg-red-600 text-white rounded disabled:opacity-50"
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

export default Admin;
