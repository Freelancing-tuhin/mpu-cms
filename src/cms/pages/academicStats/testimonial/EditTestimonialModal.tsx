import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { updateTestimonial, ITestimonial } from 'src/services/testimonial';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const EditTestimonialModal = ({ data, isOpen, setIsOpen, refresh }: any) => {
  const [form, setForm] = useState<ITestimonial>(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const change = (e: any) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const upload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: 'diecfwnp9',
        uploadPreset: 'jo9pp2yd',
        sources: ['local', 'url', 'camera'],
        folder: 'testimonials',
        cropping: false,
        multiple: false,
        maxFileSize: 1500000,
      },
      (_err: any, result: any) => {
        if (result.event === 'success') {
          setForm((f) => ({ ...f, image_icon: result.info.secure_url }));
        }
      },
    );
    widget.open();
  };

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await updateTestimonial(data._id!, form);
      refresh();
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-md w-full max-w-md relative">
        <button className="absolute top-3 right-3" onClick={() => setIsOpen(false)}>
          <MdClose size={22} />
        </button>
        <h2 className="text-xl mb-4">Edit Testimonial</h2>
        <form onSubmit={submit} className="space-y-3">
          <input
            name="order"
            type="number"
            value={form?.order || ''}
            onChange={change}
            placeholder="Order"
            className="border w-full px-3 py-2 rounded-md"
          />
          <select
            name="type"
            value={form?.type}
            onChange={change}
            className="border w-full px-3 py-2 rounded-md"
          >
            {['Student', 'Alumni', 'Recruiter'].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
          <input
            name="title"
            value={form?.title || ''}
            onChange={change}
            placeholder="Title"
            className="border w-full px-3 py-2 rounded-md"
          />
          <textarea
            name="brief"
            value={form?.brief || ''}
            onChange={change}
            placeholder="Brief"
            className="border w-full px-3 py-2 rounded-md"
          />
          <button
            type="button"
            onClick={upload}
            className="bg-purple-500 text-white px-3 py-2 rounded-md flex items-center gap-2"
          >
            <FaImage size={20} /> Upload Image
          </button>
          {form?.image_icon && (
            <img src={form?.image_icon} alt="icon" className="h-24 rounded-md" />
          )}
          <input
            name="sender_name"
            value={form?.sender_name || ''}
            onChange={change}
            placeholder="Sender Name"
            className="border w-full px-3 py-2 rounded-md"
          />
          <input
            name="sender_profession"
            value={form?.sender_profession || ''}
            onChange={change}
            placeholder="Sender Profession"
            className="border w-full px-3 py-2 rounded-md"
          />
          <input
            name="external_url"
            value={form?.external_url || ''}
            onChange={change}
            placeholder="External URL"
            className="border w-full px-3 py-2 rounded-md"
          />
          <div className="flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditTestimonialModal;
