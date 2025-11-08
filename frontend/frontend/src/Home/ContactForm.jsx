// ContactForm.jsx
import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
  const form = useRef();
  const [success, setSuccess] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_4y6evkw',
      'template_yuj2g0m',
      form.current,
      'Qb5-U5erzvBYNbxgE'
    ).then(() => {
      setSuccess(true);
      form.current.reset();
    }).catch((err) => {
      console.error('FAILED:', err);
    });
  };

  return (
    <div className="max-w-2xl mx-auto my-16 px-6">
  <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 transition-all duration-300">
    <h2 className="text-3xl md:text-4xl font-extrabold text-center text-gray-800 mb-6">
      Get in<span className="text-orange-500">Touch Contact Us</span>
    </h2>

    {success && (
      <p className="text-green-600 text-center font-medium mb-4">
         Message sent successfully!
      </p>
    )}

    <form
      ref={form}
      onSubmit={sendEmail}
      className="space-y-6"
    >
      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Name</label>
        <input
          type="text"
          name="name"
          placeholder="John Doe"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-600 mb-1">Message</label>
        <textarea
          name="message"
          rows="5"
          placeholder="Type your message..."
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-orange-500 focus:border-orange-500"
        ></textarea>
      </div>

      <div className="text-center">
        <button
          type="submit"
          className="inline-block w-full md:w-auto bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md transition duration-300"
        >
           Send Message
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default ContactForm;
