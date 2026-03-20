import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState, lazy, Suspense } from "react";
import logo from "../logo.png";
import c1 from "../c1.png";
import c2 from "../c2.png";
import c3 from "../c3.png";
import { useNavigate } from "react-router-dom";

/* 🔥 Lazy Load Components */
const Causes = lazy(() => import("./Causes"));
const Footer = lazy(() => import("./Footer"));
const ContactForm = lazy(() => import("./ContactForm"));
const Events = lazy(() => import("./Events"));
const News = lazy(() => import("./News"));
const OurProject = lazy(() => import("./OurProjects"));
const DonatePage = lazy(() => import("./DonatePage"));

const HomePage = () => {
  const curImage = [c1, c2, c3];

  const [menuOpen, setMenuOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const navigate = useNavigate();

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  /* 🔥 Slider (optimized) */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % curImage.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* 🔥 Preload next image */
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % curImage.length;
    const img = new Image();
    img.src = curImage[nextIndex];
  }, [currentIndex]);

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* Top bar */}
      <div className="bg-orange-600 text-white text-xs sm:text-sm py-2 px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="flex flex-col sm:flex-row gap-2 text-center sm:text-left">
          <span>MAIL: contact@ourcharity.com</span>
          <span>PHONE: +24 5772 120 091</span>
        </div>

        <button
          onClick={() => navigate("/admin-login")}
          className="bg-white text-orange-600 px-4 py-1.5 rounded shadow"
        >
          Admin Login
        </button>
      </div>

      {/* Header */}
      <header className="bg-white sticky top-0 z-50 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-4 sm:px-8">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-10 h-10 rounded-full" />
            <h1 className="text-2xl font-bold">
              <span className="text-orange-500">FO</span>H
            </h1>
          </div>

          <nav className="hidden md:flex space-x-6 font-semibold">
            {["project", "causes", "news", "donate", "contact"].map((id) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="hover:text-orange-500"
              >
                {id}
              </button>
            ))}
          </nav>

          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {menuOpen && (
          <div className="flex flex-col md:hidden px-6 pb-4 space-y-2">
            {["project", "causes", "news", "donate", "contact"].map((id) => (
              <button key={id} onClick={() => scrollToSection(id)}>
                {id}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* 🔥 HERO (optimized) */}
      <section className="relative w-full h-[85vh] sm:h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src={curImage[currentIndex]}
          alt="hero"
          className="absolute w-full h-full object-cover scale-105 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-20 lg:px-28">
          <div className="max-w-2xl text-white">
            {/* Tagline */}
            <p className="text-sm sm:text-base uppercase tracking-widest text-orange-400 mb-3">
              Make a Difference Today
            </p>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-5">
              Together We Can
              <span className="block text-orange-500">Change Lives</span>
            </h1>

            {/* Description */}
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-8 leading-relaxed">
              Your small contribution can create a big impact. Help us support
              children and families in need with trust, transparency, and care.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("donate")}
                className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg transition duration-300"
              >
                Donate Now
              </button>

              <button
                onClick={() => scrollToSection("causes")}
                className="border cursor-pointer border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-black transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Slide Indicator */}
        <div className="absolute bottom-6 left-6 flex gap-3">
          {curImage.map((_, idx) => (
            <div
              key={idx}
              className={`h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex ? "w-8 bg-orange-500" : "w-3 bg-white/50"
              }`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={() =>
            setCurrentIndex((prev) => (prev + 1) % curImage.length)
          }
          className="hidden md:flex absolute right-6 bottom-10 w-14 h-14 bg-white/20 backdrop-blur-md border border-white/30 text-white rounded-full items-center justify-center hover:bg-orange-500 transition duration-300"
        >
          <ArrowRight size={26} />
        </button>
      </section>

      {/* 🔥 Lazy Sections */}
      <Suspense
        fallback={
          <div className="p-10 animate-pulse">
            <div className="h-40 bg-gray-200 mb-4" />
          </div>
        }
      >
        <News id="news" />
        <Causes id="causes" />
        <Events />
        <OurProject id="project" />
        <ContactForm id="contact" />
        <DonatePage id="donate" />
        <Footer />
      </Suspense>
    </div>
  );
};

export default HomePage;
