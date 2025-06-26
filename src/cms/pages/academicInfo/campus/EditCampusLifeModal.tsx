import { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { updateCampusLifeHighlight } from 'src/services/campus';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const EditCampusLifeModal = ({ getHighlights, data, isOpen, setIsOpen }: any) => {
  const [formData, setFormData] = useState<any>({
    order: data?.order,
    title: data?.title,
    brief: data?.brief,
    featured_image: data?.featured_image || '',
    link_url: data?.link_url || '',
  });

  const toggleModal = () => setIsOpen(false);

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
      await updateCampusLifeHighlight(data?._id, formData);
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
      console.error('Failed to update highlight:', error);
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
        sources: ['local', 'url', 'camera'],
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

  useEffect(() => {
    setFormData({
      order: data?.order,
      title: data?.title,
      brief: data?.brief,
      featured_image: data?.featured_image || '',
      link_url: data?.link_url || '',
    });
  }, [data]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={toggleModal}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <MdClose size={22} />
            </button>

            <h2 className="text-xl font-semibold mb-4">Edit Campus Highlight</h2>

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
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditCampusLifeModal;
