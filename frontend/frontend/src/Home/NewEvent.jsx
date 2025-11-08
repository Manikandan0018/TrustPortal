import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

const BaseUrl = import.meta.env.VITE_BACKEND_URL;

const fetchEvents = async () => {
  const res = await fetch(`${BaseUrl}/api/auth/getEvent`);
  if (!res.ok) throw new Error('Failed to fetch events');
  return res.json();
};

const addEvent = async (data) => {
  const res = await fetch(`${BaseUrl}/api/auth/newEvent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to add event');
  return res.json();
};

const deleteEvent = async (id) => {
  const res = await fetch(`${BaseUrl}/api/auth/deleteEvent/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete event');
  return res.json();
};

const updateEvent = async ({ id, updatedData }) => {
  const res = await fetch(`${BaseUrl}/api/auth/updateEvent/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error('Failed to update event');
  return res.json();
};

const UpdateEvent = () => {
  const queryClient = useQueryClient();
  const [form, setForm] = useState({ title: '', date: '', month: '', description: '' });
  const [editId, setEditId] = useState(null);

  const { data: events = [], isLoading } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  const addMutation = useMutation({
    mutationFn: addEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      setForm({ title: '', date: '', month: '', description: '' });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteEvent,
    onSuccess: () => queryClient.invalidateQueries(['events']),
  });

  const updateMutation = useMutation({
    mutationFn: updateEvent,
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      setForm({ title: '', date: '', month: '', description: '' });
      setEditId(null);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateMutation.mutate({ id: editId, updatedData: form });
    } else {
      addMutation.mutate(form);
    }
  };

  const handleEdit = (event) => {
    setEditId(event._id);
    setForm({
      title: event.title,
      date: event.date,
      month: event.month,
      description: event.description,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-bold text-orange-600 mb-6 text-center">
            {editId ? 'Update Event' : 'Add upcoming Event'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Event Title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-orange-500"
              required
            />
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Date (e.g., 15)"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-orange-500"
                required
              />
              <input
                type="text"
                placeholder="Month (e.g., July)"
                value={form.month}
                onChange={(e) => setForm({ ...form, month: e.target.value })}
                className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-orange-500"
                required
              />
            </div>
            <textarea
              placeholder="Description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-300 px-4 py-2 rounded-lg focus:outline-orange-500"
              rows={3}
              required
            ></textarea>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold px-6 py-2 rounded-lg transition"
              >
                {editId
                  ? updateMutation.isPending
                    ? 'Updating...'
                    : 'Update Event'
                  : addMutation.isPending
                  ? 'Adding...'
                  : 'Add Event'}
              </button>
              {editId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditId(null);
                    setForm({ title: '', date: '', month: '', description: '' });
                  }}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-6 py-2 rounded-lg"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Event List */}
        <div className="mt-10 space-y-6">
          <h3 className="text-xl font-bold text-gray-700">All Events</h3>
          {isLoading ? (
            <p>Loading events...</p>
          ) : events.length === 0 ? (
            <p className="text-gray-500 italic">No upcoming events</p>
          ) : (
            events.map((event) => (
              <div
                key={event._id}
                className="bg-white shadow-sm rounded-lg p-4 border hover:shadow-md transition"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold text-lg text-gray-800">{event.title}</h4>
                    <p className="text-sm text-gray-500">
                      {event.date} {event.month} • {event.description}
                    </p>
                  </div>
                  <div className="flex gap-3 mt-1">
                    <button
                      onClick={() => handleEdit(event)}
                      className="text-blue-600 hover:underline text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(event._id)}
                      className="text-red-600 hover:underline text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UpdateEvent;
