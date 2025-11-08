import { useQuery } from '@tanstack/react-query';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';
import c1 from '../c1.png';
import c2 from '../c6.jpg';
import c3 from '../c5.jpg';
import cause1 from '../c4.jpg';
import cause2 from '../cause2.jpg';
import cause3 from '../cause3.jpg';

// Optional: fallback gallery images
const galleryImages = [c1, c2, c3, cause1, cause2, cause3];

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// Fetch events from backend
const fetchEvents = async () => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/auth/getEvent`);
  if (!res.ok) throw new Error('Failed to load events');
  return res.json();
};

const Events = () => {
  const { data: events = [], isLoading, isError } = useQuery({
    queryKey: ['events'],
    queryFn: fetchEvents,
  });

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Upcoming Events */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Upcoming <span className="text-orange-500">Events</span>
        </h2>

        {isLoading && <p>Loading events...</p>}
        {isError && <p className="text-red-500">Failed to load events.</p>}

        <div className="space-y-6">
          {events.length === 0 && !isLoading && <p>No upcoming events</p>}
          {events.map((event, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-orange-500 text-white w-20 h-20 flex flex-col justify-center items-center font-bold text-lg rounded">
                <span className="text-2xl">{event.date}</span>
                <span className="text-sm">{event.month}</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 text-lg mb-1">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500 flex items-center gap-2">
                  <FaClock className="text-orange-500" /> at {event.time}
                  <FaMapMarkerAlt className="text-orange-500 ml-4" /> {event.location}
                </p>
                <p className="text-sm text-gray-400 mt-1">
                  {event.description || 'No description provided.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Photo Gallery */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Photo <span className="text-orange-500">Gallery</span>
        </h2>
        <div className="grid grid-cols-3 gap-2">
          {galleryImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt="Gallery"
              className="w-full h-24 sm:h-32 object-cover rounded shadow"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Events;
