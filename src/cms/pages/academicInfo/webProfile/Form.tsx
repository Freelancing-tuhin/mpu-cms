import { motion } from 'framer-motion';
import { useState } from 'react';

const WebProfileForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    address: '',
    contact: '',
    email: '',
    helpline: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClear = () => {
    setFormData({
      title: '',
      address: '',
      contact: '',
      email: '',
      helpline: '',
      location: '',
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Submitted Data:', formData);
    // Add update logic here
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 rounded-2xl px-20 py-5 shadow-xl max-w-6xl mx-auto mt-10"
    >
      <h2 className="text-xl font-bold text-blue-600 mb-6">Profile Setting</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title - Full Width */}
        <div>
          <label className="font-semibold text-blue-700">Title of Company/Firm/Organization</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Madhyanchal Professional University..."
            className="mt-1 w-full rounded-lg border px-4 py-2 outline-none dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Address - Full Width */}
        <div>
          <label className="font-semibold text-blue-700">Address</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            rows={3}
            placeholder="Madhyanchal Professional University..."
            className="mt-1 w-full rounded-lg border px-4 py-2 resize-none outline-none dark:bg-gray-700 dark:text-white"
          ></textarea>
        </div>

        {/* Grid of 2 per row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="font-semibold text-blue-700">Contact Number(s)</label>
            <input
              type="text"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              placeholder="0755-2896281"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-blue-700">Email ID</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="info@mpu.ac.in"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-blue-700">Helpline</label>
            <input
              type="text"
              name="helpline"
              value={formData.helpline}
              onChange={handleChange}
              placeholder="9406565377"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="font-semibold text-blue-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Ratibad Bhopal"
              className="mt-1 w-full rounded-lg border px-4 py-2 outline-none dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
          >
            Clear
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default WebProfileForm;
