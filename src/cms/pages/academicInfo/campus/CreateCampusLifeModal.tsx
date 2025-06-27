import { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { createCampusLifeHighlight } from 'src/services/campus';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CreateCampusLifeModal = ({ getHighlights }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    order: '',
    title: '',
    brief: '',
    featured_image: '',
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
      await createCampusLifeHighlight(formData);
      toggleModal();
      setFormData({
        order: '',
        title: '',
        brief: '',
        featured_image: '',
        link_url: '',
      });
      getHighlights();
    } catch (error) {
      console.error('Failed to create highlight:', error);
    }
  };

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const openCloudinaryWidget = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'diecfwnp9',
        uploadPreset: 'jo9pp2yd',
        sources: ['local', 'url', 'camera', 'facebook', 'instagram'],
        folder: 'campus_highlights',
        cropping: false,
        multiple: false,
        maxFileSize: 1500000,
      },
      (error: any, result: any) => {
        if (!error && result?.event === 'success') {
          setFormData((prev: any) => ({
            ...prev,
            featured_image: result.info.secure_url,
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
        Add Highlight
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

            <h2 className="text-xl font-semibold mb-4">Add New Highlight</h2>

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
              <button
                type="button"
                onClick={openCloudinaryWidget}
                className="bg-purple-500 flex gap-2 text-white px-3 py-2 rounded-md hover:bg-purple-600"
              >
                <FaImage size={20} />
                Upload Image
              </button>
              {formData.featured_image && (
                <img src={formData.featured_image} alt="Preview" className="h-32 rounded-md" />
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
                  Save Highlight
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateCampusLifeModal;
