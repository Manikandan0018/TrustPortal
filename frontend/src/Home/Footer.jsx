import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaGlobe,
  FaFacebookF,
  FaTwitter,
  FaSkype,
  FaYoutube,
  FaInstagram,
  FaPinterestP,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 px-8 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Left Column */}
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">
            <span className="text-orange-500">E</span>-CHARITY
          </h3>
          <p className="text-sm mb-4">
            Lorem ipsum dolor sit amet, consecte tur adipisic ing elit lestias eius illum libero dolor nobis deleniti.
          </p>
          <p className="text-sm">203, Envato Labs, Behind Alis Steet, Melbourne, Australia.</p>
          <p className="flex items-center gap-2 mt-2">
            <FaPhoneAlt className="text-orange-500" /> 123-456-789
          </p>
          <p className="flex items-center gap-2 mt-1">
            <FaEnvelope className="text-orange-500" /> contact@yourdomain.com
          </p>
          <p className="flex items-center gap-2 mt-1">
            <FaGlobe className="text-orange-500" /> www.yourdomain.com
          </p>
        </div>

        {/* Useful Links */}
        {/* <div>
          <h4 className="text-white font-semibold mb-3 border-b border-orange-500 inline-block">Useful Links</h4>
          <ul className="space-y-2 text-sm mt-3">
            <li>Body Building</li>
            <li>Fitness Classes</li>
            <li>Weight Lifting</li>
            <li>Yoga Courses</li>
            <li>Training</li>
          </ul>
        </div> */}

        {/* Twitter Feed (Empty for now) */}
        <div>
          <h4 className="text-white font-semibold mb-3 border-b border-orange-500 inline-block">Twitter Feed</h4>
        </div>

        {/* Latest News */}
        <div>
          <h4 className="text-white font-semibold mb-3 border-b border-orange-500 inline-block">Latest News</h4>
          <div className="mt-3 space-y-4 text-sm">
            <div>
              <p className="font-semibold text-white">Sustainable Construction</p>
              <p>Mar 08, 2015</p>
            </div>
            <div>
              <p className="font-semibold text-white">Industrial Coatings</p>
              <p>Mar 08, 2015</p>
            </div>
            <div>
              <p className="font-semibold text-white">Storefront Installations</p>
              <p>Mar 08, 2015</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {/* Subscribe */}
        <div>
          <h5 className="text-white font-semibold mb-2">Subscribe Us</h5>
          <div className="flex">
            <input
              type="email"
              placeholder="Your Email"
              className="px-4 py-2 bg-white w-full md:w-64 text-black"
            />
            <button className="bg-orange-500 text-white px-4">Subscribe</button>
          </div>
        </div>

        {/* Call Us */}
        <div className="text-sm">
          <h5 className="text-white font-semibold mb-2">Call Us Now</h5>
          <p>+61 3 1234 5678</p>
          <p>+12 3 1234 5678</p>
        </div>

        {/* Social Icons */}
        <div>
          <h5 className="text-white font-semibold mb-2">Connect With Us</h5>
          <div className="flex gap-3 mt-2">
            <FaFacebookF className="bg-black text-white p-2 rounded-full w-8 h-8" />
            <FaTwitter className="bg-black text-white p-2 rounded-full w-8 h-8" />
            <FaSkype className="bg-black text-white p-2 rounded-full w-8 h-8" />
            <FaYoutube className="bg-black text-white p-2 rounded-full w-8 h-8" />
            <FaInstagram className="bg-black text-white p-2 rounded-full w-8 h-8" />
            <FaPinterestP className="bg-black text-white p-2 rounded-full w-8 h-8" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
