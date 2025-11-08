import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import logo from '../logo.png';
import c1 from '../c1.png';
import c2 from '../c2.png';
import c3 from '../c3.png';
// import ChatBot from "../ChatBot";
import Causes from "./Causes";
import Footer from "./Footer";
import ContactForm from "./ContactForm";
import Events from "./Events";
import News from "./News";
import { useNavigate } from 'react-router-dom';
import OurProject from "./OurProjects";
import DonatePage from "./DonatePage";


const HomePage = () => {
  const curImage = [c1, c2, c3];
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();
  
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % curImage.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [curImage.length]);

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Top bar */}
      <div className="bg-orange-600 text-white text-xs sm:text-sm py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-center sm:text-left">
          <span>MAIL: contact@ourcharity.com</span>
          <span>PHONE: +24 5772 120 091 / +56452 4567</span>
        </div>

        <button
          onClick={() => navigate("/admin-login")}
          className="bg-white text-orange-600 hover:bg-gray-100 font-semibold text-xs sm:text-sm px-4 py-1.5 rounded shadow transition w-full sm:w-auto text-center"
        >
          Admin Login
        </button>
      </div>

      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-8">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold text-gray-800">
              <span className="text-orange-500">FO</span>H
            </h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-6 font-semibold text-gray-700">
            {[
              { name: "Home", id: "#" },
              { name: "About us", id: "project" },
              { name: "Causes", id: "causes" },
              { name: "News", id: "news" },
              { name: "Donate", id: "donate" },
              { name: "Contact us", id: "contact" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-orange-500 transition"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Donate CTA */}

          <a
            href="#"
            className="hidden md:block bg-gray-900 text-white text-sm font-semibold px-5 py-2 rounded shadow hover:bg-black transition"
          >
            Donate Now
          </a>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className=" flex flex-col md:hidden bg-white border-t px-6 pb-4 space-y-2 font-semibold text-gray-700">
            {[
              { name: "Home", id: "home" },
              { name: "About us", id: "project" },
              { name: "Causes", id: "causes" },
              { name: "News", id: "news" },
              { name: "Donate", id: "donate" },
              { name: "Contact us", id: "contact" },
            ].map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="hover:text-orange-500 transition"
              >
                {item.name}
              </button>
            ))}
            <a
              href="donate"
              className="block bg-gray-900 text-white text-center py-2 mt-2 rounded shadow"
            >
              Donate Now
            </a>
          </div>
        )}
      </header>

      {/* Hero Slider */}
      <section className="relative w-full h-[80vh] sm:h-screen overflow-hidden">
        {/* Carousel Images */}
        {curImage.map((img, idx) => (
          <img
            key={idx}
            src={img}
            alt={`slide-${idx}`}
            className={`absolute w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
              idx === currentIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}

        {/* Overlay Content */}
        <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-start text-white px-6 sm:px-16 md:px-24">
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-extrabold leading-tight mb-6">
            Donate
          </h1>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-white/90 mb-6">
            Together We Trust, Together We Transform
          </h2>
          <p className="max-w-3xl text-lg sm:text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
            Your single act of kindness can change a child's entire year. At
            Friends of Humanity, we believe in earning trust through transparent
            action and lifelong impact. Join us in giving every child the future
            they deserve.
          </p>
          <div className="flex flex-wrap gap-6">
            <a
              href="#"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold text-lg md:text-xl px-10 py-4 rounded-full shadow transition"
            >
              Donate Now
            </a>
            <a
              href="#"
              className="border-2 border-orange-500 text-white hover:bg-white hover:text-orange-600 font-semibold text-lg md:text-xl px-10 py-4 rounded-full transition"
            >
              Read More
            </a>
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="absolute bottom-6 left-6 flex gap-2 text-sm text-white/80">
          {curImage.map((_, idx) => (
            <span
              key={idx}
              className={`px-1 ${
                idx === currentIndex ? "text-orange-500 font-semibold" : ""
              }`}
            >
              0{idx + 1}
            </span>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % curImage.length)
          }
          className="hidden md:flex absolute right-6 top-20 w-15 h-15 bg-orange-500 text-white rounded-full items-center justify-center shadow-lg hover:bg-orange-600 transition"
          aria-label="Next Slide"
        >
          <ArrowRight size={30} />
        </button>
      </section>

      <News id="news" />

      {/* Feature Section */}
      <section className="relative bg-gray-100 px-4 sm:px-6 lg:px-8 py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Become a Volunteer",
              desc: "Join hands to uplift lives and communities.",
              icon: "🫱",
              btn: "Join us Now",
            },
            {
              title: "Adopt a Child",
              desc: "Give a child hope, care and a better tomorrow.",
              icon: "🌱",
              btn: "Contact us",
            },
            {
              title: "Get Involved",
              desc: "Support causes that matter. Every bit helps.",
              icon: "🤲",
              btn: "Donate Us",
            },
            {
              title: "Emergency Case",
              desc: "+(012) 345 6789",
              icon: "🆘",
              btn: "Contact Now",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-gradient-to-br from-orange-400 to-orange-500 text-white rounded-xl shadow-lg p-8 text-center transition-transform duration-300 hover:scale-105"
            >
              <div className="w-20 h-20 bg-white text-orange-500 rounded-full flex items-center justify-center text-4xl mx-auto mb-6 shadow-md">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold uppercase mb-3 tracking-wide">
                {item.title}
              </h3>
              <p className="text-sm mb-5">{item.desc}</p>
              <button className="mt-auto inline-block border border-white text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-white hover:text-orange-500 transition">
                {item.btn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* cause section   */}
      <Causes id="causes" />

      {/* volunteenrs */}
      <div
        className="relative h-auto md:h-[400px] lg:h-[400px] bg-fixed bg-center bg-cover flex items-center justify-center"
        style={{
          backgroundImage: `url(${c2})`,
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-10">
          {/* Left Text Section */}
          <div className="text-white max-w-xl text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight">
              Become a <span className="text-orange-500">Volunteer</span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-200">
              Join hands with us to make a difference. Your small step can bring
              a big change in someone's life. Let’s serve, support, and uplift
              together.
            </p>
            <button className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md transition duration-300">
              Join Us
            </button>
          </div>

          {/* Right Image */}
          <div className="w-full sm:w-[300px] md:w-[350px] h-[200px] sm:h-[250px] rounded-lg overflow-hidden shadow-lg">
            <img
              src={c2}
              alt="Volunteer"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <Events />
      <OurProject id="project" />

      <ContactForm id="contact" />
      <DonatePage id="donate" />

      {/* <ChatBot/> */}

      {/* Footer */}

      <Footer />
    </div>
  );
};

export default HomePage;
