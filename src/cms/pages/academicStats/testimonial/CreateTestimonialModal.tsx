import { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { createTestimonial, ITestimonial } from 'src/services/testimonial';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CreateTestimonialModal = ({ refresh }: { refresh: () => void }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ITestimonial>({
    order: null,
    type: 'Student',
    title: '',
    brief: '',
    image_icon: '',
    sender_name: '',
    sender_profession: '',
    external_url: '',
  });

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const toggle = () => setOpen((o) => !o);

  const change = (e: any) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const uploadImage = () => {
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
      await createTestimonial(form);
      toggle();
      refresh();
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <button
        onClick={toggle}
        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-1"
      >
        <IoMdAddCircleOutline size={20} /> Add Testimonial
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 rounded-md w-full max-w-md relative">
            <button className="absolute top-3 right-3" onClick={toggle}>
              <MdClose size={22} />
            </button>
            <h2 className="text-xl mb-4">New Testimonial</h2>
            <form onSubmit={submit} className="space-y-3">
              <input
                name="order"
                type="number"
                placeholder="Order"
                onChange={change}
                className="border w-full px-3 py-2 rounded-md"
              />
              <select name="type" onChange={change} className="border w-full px-3 py-2 rounded-md">
                {['Student', 'Alumni', 'Recruiter'].map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
              <input
                name="title"
                placeholder="Title"
                onChange={change}
                className="border w-full px-3 py-2 rounded-md"
              />
              <textarea
                name="brief"
                placeholder="Brief"
                onChange={change}
                className="border w-full px-3 py-2 rounded-md"
              />
              <button
                type="button"
                className="bg-purple-500 text-white px-3 py-2 rounded-md flex items-center gap-2"
                onClick={uploadImage}
              >
                <FaImage size={20} /> Upload Image
              </button>
              {form.image_icon && (
                <img src={form.image_icon} alt="icon" className="h-24 rounded-md" />
              )}
              <input
                name="sender_name"
                placeholder="Sender Name"
                onChange={change}
                className="border w-full px-3 py-2 rounded-md"
              />
              <input
                name="sender_profession"
                placeholder="Sender Profession"
                onChange={change}
                className="border w-full px-3 py-2 rounded-md"
              />
              <input
                name="external_url"
                placeholder="External URL"
                onChange={change}
                className="border w-full px-3 py-2 rounded-md"
              />
              <div className="flex justify-end">
                <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
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

export default CreateTestimonialModal;
