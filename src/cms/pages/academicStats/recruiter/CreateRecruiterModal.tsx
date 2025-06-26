import { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { createRecruiter } from 'src/services/recruiter';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CreateRecruiterModal = ({ getRecruiters }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    order: '',
    title: '',
    brief: '',
    featured_image: '',
    link_url: '',
  });

  const toggle = () => setIsOpen(!isOpen);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createRecruiter(formData);
      getRecruiters();
      setFormData(null);
      toggle();
    } catch (err) {
      console.error(err);
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
        folder: 'recruiters',
        cropping: false,
        multiple: false,
        maxFileSize: 1500000,
      },
      (err: any, result: any) => {
        if (!err && result?.event === 'success') {
          setFormData((prev: any) => ({ ...prev, featured_image: result.info.secure_url }));
        }
      },
    );
    widget.open();
  };

  return (
    <>
      <button
        onClick={toggle}
        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-blue-600"
      >
        <IoMdAddCircleOutline size={20} /> Add Recruiter
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button
              onClick={toggle}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <MdClose size={22} />
            </button>
            <h2 className="text-xl font-semibold mb-4">Add Recruiter</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="order"
                type="number"
                placeholder="Order"
                value={formData.order}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              <input
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              <textarea
                name="brief"
                placeholder="Brief"
                value={formData.brief}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              <button
                type="button"
                onClick={openCloudinaryWidget}
                className="bg-purple-500 text-white px-3 py-2 rounded-md flex items-center gap-2 hover:bg-purple-600"
              >
                <FaImage size={20} /> Upload Image
              </button>
              {formData.featured_image && (
                <img src={formData.featured_image} alt="Preview" className="h-32 rounded-md" />
              )}
              <input
                name="link_url"
                placeholder="Link URL"
                value={formData.link_url}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateRecruiterModal;
