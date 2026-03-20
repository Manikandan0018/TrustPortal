import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState, lazy, Suspense } from "react";
import logo from "../logo.png";
import c1 from "../c1.png";
import c2 from "../c2.png";
import c3 from "../c3.png";
import { useNavigate } from "react-router-dom";

/* 🔥 Lazy load sections */
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
    const el = document.getElementById(id);
    if (!el) return;

    const yOffset = -80;
    const y = el.getBoundingClientRect().top + window.scrollY + yOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  };

  /* 🔥 Slider */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % curImage.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  /* 🔥 Preload next image */
  useEffect(() => {
    const next = new Image();
    next.src = curImage[(currentIndex + 1) % curImage.length];
  }, [currentIndex]);

  return (
    <div className="font-sans text-gray-800 bg-white">
      {/* TOP BAR */}
      <div className="bg-orange-600 text-white text-sm py-2 px-4 flex justify-between items-center">
        <span>contact@ourcharity.com</span>
        <button
          onClick={() => navigate("/admin-login")}
          className="bg-white text-orange-600 px-3 py-1 rounded"
        >
          Admin
        </button>
      </div>

      {/* HEADER */}
      <header className="bg-white sticky top-0 z-50 shadow">
        <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <img src={logo} className="w-10 h-10" />
            <h1 className="font-bold text-xl">
              <span className="text-orange-500">FO</span>H
            </h1>
          </div>

          <nav className="hidden md:flex gap-6">
            {["project", "causes", "news", "donate", "contact"].map((id) => (
              <button key={id} onClick={() => scrollToSection(id)}>
                {id}
              </button>
            ))}
          </nav>

          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* 🔥 HERO (ONLY ONE IMAGE LOADS) */}
      <section className="relative h-screen overflow-hidden">
        {/* Background Image */}
        <img
          src={curImage[currentIndex]}
          alt="hero"
          className="absolute w-full h-full object-cover scale-105 transition-transform duration-700"
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center px-6 sm:px-12 md:px-20">
          <div className="max-w-2xl text-white space-y-6">
            {/* Tagline */}
            <p className="uppercase tracking-widest text-orange-400 text-sm">
              Join the Movement
            </p>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
              Change Lives
              <span className="block text-orange-500">With Your Kindness</span>
            </h1>

            {/* Description */}
            <p className="text-gray-200 text-sm sm:text-base md:text-lg leading-relaxed">
              Every small contribution creates a big impact. Help us bring hope,
              support, and a better future to those who need it most.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("donate")}
                className="bg-orange-500 hover:bg-orange-600 px-8 py-3 rounded-full font-semibold shadow-xl transition duration-300"
              >
                Donate Now
              </button>

              <button
                onClick={() => scrollToSection("project")}
                className="border border-white px-8 py-3 rounded-full font-semibold backdrop-blur-md hover:bg-white hover:text-black transition duration-300"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>

        {/* Indicators */}
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

      {/* 🔥 LAZY LOADED SECTIONS */}
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
