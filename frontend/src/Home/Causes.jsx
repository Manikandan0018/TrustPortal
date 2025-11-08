import  { useRef } from "react";
import { FaHeart } from "react-icons/fa";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import cause1 from "../cause1.jpg"
import cause2 from "../cause2.jpg"
import cause3 from "../cause3.jpg"
import c1 from "../c1.png"

const causes = [
  {
    id: 1,
    title: "Plant Trees, Protect Tomorrow",
    description:
      "Help us create a greener, cleaner planet for future generations. Your support can restore forests and bring life back to barren lands.",
    image: cause2,
    raised: 1890,
    goal: 2500,
    donors: 89,
  },
  {
    id: 2,
    title: "Gift a Book, Light a Mind",
    description:
      "Every child deserves the magic of books. Your donation helps provide learning materials that spark curiosity and build brighter futures.",
    image: cause3,
    raised: 1890,
    goal: 2500,
    donors: 89,
  },
  {
    id: 3,
    title: "Nourish a Hungry People",
    description:
      "A full stomach means a hopeful heart. Join us in the fight against hunger and make sure no People goes to bed without a meal.",
    image: cause1,
    raised: 1890,
    goal: 2500,
    donors: 89,
    percent: 84,
  },
  {
    id: 4,
    title: "Empower Through Education",
    description:
      "Education is the key to breaking the cycle of poverty. With your help, we can put books, teachers, and hope in every child’s life.",
    image: c1,
    raised: 1890,
    goal: 2500,
    donors: 89,
    percent: 84,
  },
];


const Causes = ({ id }) => {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div id={id} className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-center text-3xl font-bold text-gray-800">
        Our <span className="text-orange-500">Causes</span>
      </h2>
      <p className="text-center text-gray-500 max-w-xl mx-auto mt-2">
        Be the reason someone smiles today. Together, we can bring hope to the
        forgotten corners of the world.
      </p>

      <div className="relative mt-12">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border rounded-full shadow hover:bg-gray-100"
        >
          <FaChevronLeft />
        </button>

        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 scrollbar-hide scroll-smooth px-6"
        >
          {causes.map((cause) => (
            <div
              key={cause.id}
              className="flex-shrink-0 w-80 bg-white rounded-md shadow-sm overflow-hidden"
            >
              <div className="relative">
                <img
                  src={cause.image}
                  alt={cause.title}
                  className="h-64 w-full object-cover"
                />
                <div className="absolute bottom-0 left-0 w-full bg-orange-500 h-2"></div>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800 mb-2">
                  {cause.title}
                </h3>
                <p className="text-sm text-gray-500 mb-4">
                  {cause.description}
                </p>

                <div className="flex items-center justify-between">
                  <button className="bg-orange-500 text-white px-4 py-2 text-sm rounded hover:bg-orange-600">
                    Donate
                  </button>
                  <p className="text-gray-500 flex items-center gap-1 text-sm">
                    <FaHeart className="text-orange-500" /> {cause.donors}{" "}
                    Donors
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border rounded-full shadow hover:bg-gray-100"
        >
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
};

export default Causes;