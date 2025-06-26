import { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { createSchool } from 'src/services/school';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CreateSchoolModal = ({ getSchools }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    order: '',
    title: '',
    brief: '',
    logo: '',
    link_url: '',
  });

  const toggleModal = () => setIsOpen(!isOpen);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createSchool(formData);
      console.log('School created:', response);
      // Optional: Toast success, refresh list, etc.
      toggleModal();
      setFormData({
        order: '',
        title: '',
        brief: '',
        logo: '',
        link_url: '',
      });
      getSchools();
    } catch (error) {
      console.error('Failed to create school:', error);
      // Optional: Toast error
    }
  };

  // Load Cloudinary widget
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openCloudinaryWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'diecfwnp9', // 🔁 Replace with your Cloudinary cloud name
        uploadPreset: 'jo9pp2yd', // 🔁 Replace with your upload preset
        sources: ['local', 'url', 'camera', 'facebook', 'instagram'],
        cropping: false,
        multiple: false,
        folder: 'schools_logos', // optional
        maxFileSize: 1500000, // optional (1.5MB)
      },
      (error: any, result: any) => {
        if (!error && result && result.event === 'success') {
          const logoUrl = result.info.secure_url;
          setFormData((prev: any) => ({
            ...prev,
            logo: logoUrl,
          }));
        }
      },
    );
    widget.open();
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="bg-blue-500 flex items-center gap-1 text-white px-4 py-2.5 rounded-md hover:bg-blue-600 transition-all"
      >
        <IoMdAddCircleOutline size={20} />
        Add School
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <MdClose size={22} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Add New School</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="order"
                type="number"
                placeholder="Order"
                value={formData.order}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />

              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />

              <textarea
                name="brief"
                placeholder="Brief Description"
                value={formData.brief}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />

              {/* Cloudinary Upload Button */}
              <div className="flex items-center gap-4 ">
                <button
                  type="button"
                  onClick={openCloudinaryWidget}
                  className="bg-purple-500 flex gap-2 text-white px-3 py-2 rounded-md hover:bg-purple-600"
                >
                  <FaImage className="text-white" size={20} />
                  Upload Logo
                </button>
              </div>
              {formData.logo && (
                <img src={formData.logo} alt="Logo preview" className="h-32 rounded-md" />
              )}
              <input
                name="link_url"
                placeholder="Website Link"
                value={formData.link_url}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Save School
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateSchoolModal;
