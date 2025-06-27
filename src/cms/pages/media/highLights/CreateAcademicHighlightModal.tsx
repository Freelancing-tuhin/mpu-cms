import { useState, useEffect } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { createAcademicHighlight, IAcademicHighlight } from 'src/services/academicHighlights';

declare global {
  interface Window {
    cloudinary: any;
  }
}

export default function CreateAcademicHighlightModal({ refresh }: { refresh: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<IAcademicHighlight>({
    order: 0,
    title: '',
    text: '',
    featured_image: '',
    link_url: '',
  });

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const handleChange = (e: any) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const upload = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'diecfwnp9',
          uploadPreset: 'jo9pp2yd',
          sources: ['local', 'url', 'camera'],
          folder: 'academic_highlights',
          cropping: false,
          multiple: false,
          maxFileSize: 1500000,
        },
        (_e: any, result: any) => {
          if (result.event === 'success')
            setForm((f) => ({ ...f, featured_image: result.info.secure_url }));
        },
      )
      .open();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createAcademicHighlight(form);
      refresh();
      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-600"
      >
        <IoMdAddCircleOutline size={20} /> New Highlight
      </button>
      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3">
              <MdClose size={22} />
            </button>
            <h2 className="text-xl mb-4">Create Highlight</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                name="order"
                value={form.order || 0}
                onChange={handleChange}
                placeholder="Order"
                className="w-full px-3 py-2 border rounded"
              />
              <input
                name="title"
                value={form.title || ''}
                onChange={handleChange}
                placeholder="Title"
                className="w-full px-3 py-2 border rounded"
              />
              <textarea
                name="text"
                value={form.text || ''}
                onChange={handleChange}
                placeholder="Text"
                className="w-full px-3 py-2 border rounded"
              />
              <button
                type="button"
                onClick={upload}
                className="bg-purple-500 text-white px-3 py-2 rounded flex items-center gap-2 hover:bg-purple-600"
              >
                <FaImage size={20} /> Upload Image
              </button>
              {form.featured_image && (
                <img src={form.featured_image} className="h-32 rounded" alt="preview" />
              )}
              <input
                name="link_url"
                value={form.link_url || ''}
                onChange={handleChange}
                placeholder="Link URL"
                className="w-full px-3 py-2 border rounded"
              />
              <button
                type="submit"
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
