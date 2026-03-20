import { useQuery } from "@tanstack/react-query";
import { memo, useMemo } from "react";
import { FaClock, FaMapMarkerAlt } from "react-icons/fa";

// Images
import c1 from "../c1.png";
import c2 from "../c6.jpg";
import c3 from "../c5.jpg";
import cause1 from "../c4.jpg";
import cause2 from "../cause2.jpg";
import cause3 from "../cause3.jpg";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

// 🔹 Fetch API
const fetchEvents = async () => {
  const res = await fetch(`${VITE_BACKEND_URL}/api/auth/getEvent`);
  if (!res.ok) throw new Error("Failed to load events");
  return res.json();
};

// 🔹 Spinner Component
const Spinner = () => (
  <div className="flex justify-center items-center py-10">
    <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

// 🔹 Skeleton Loader
const Skeleton = () => (
  <div className="animate-pulse space-y-4">
    {[1, 2, 3].map((i) => (
      <div key={i} className="flex gap-4">
        <div className="w-20 h-20 bg-gray-300 rounded"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div>
          <div className="h-3 bg-gray-300 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-full"></div>
        </div>
      </div>
    ))}
  </div>
);

// 🔹 Event Card (Memoized)
const EventCard = memo(({ event }) => (
  <div className="flex items-start gap-4 hover:bg-gray-50 p-2 rounded transition">
    <div className="bg-orange-500 text-white w-20 h-20 flex flex-col justify-center items-center font-bold text-lg rounded shadow">
      <span className="text-2xl">{event.date}</span>
      <span className="text-sm">{event.month}</span>
    </div>

    <div>
      <h3 className="font-semibold text-gray-800 text-lg mb-1">
        {event.title}
      </h3>

      <p className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
        <FaClock className="text-orange-500" /> {event.time}
        <FaMapMarkerAlt className="text-orange-500 ml-3" /> {event.location}
      </p>

      <p className="text-sm text-gray-400 mt-1 line-clamp-2">
        {event.description || "No description provided."}
      </p>
    </div>
  </div>
));

const Events = () => {
  const {
    data: events = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
    staleTime: 1000 * 60 * 5, // cache 5 mins
    refetchOnWindowFocus: false,
  });

  // 🔹 Memoized gallery images
  const galleryImages = useMemo(() => [c1, c2, c3, cause1, cause2, cause3], []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* 🔸 Events Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Upcoming <span className="text-orange-500">Events</span>
        </h2>

        {isLoading && (
          <>
            <Spinner />
            <Skeleton />
          </>
        )}

        {isError && (
          <p className="text-red-500 text-sm">
            Failed to load events. Please try again.
          </p>
        )}

        {!isLoading && events.length === 0 && (
          <p className="text-gray-500">No upcoming events</p>
        )}

        <div className="space-y-5">
          {events.map((event, index) => (
            <EventCard key={event.id || index} event={event} />
          ))}
        </div>
      </div>

      {/* 🔸 Gallery Section */}
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Photo <span className="text-orange-500">Gallery</span>
        </h2>

        <div className="grid grid-cols-3 gap-2">
          {galleryImages.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`gallery-${i}`}
              loading={i < 3 ? "eager" : "lazy"} // 👈 smart loading
              className="w-full h-24 sm:h-32 object-cover rounded shadow hover:scale-105 transition-transform duration-300"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default memo(Events);
