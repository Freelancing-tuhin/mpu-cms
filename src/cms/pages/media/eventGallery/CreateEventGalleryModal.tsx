import { useState, useEffect } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { createEventGallery, IEventGallery } from 'src/services/eventGallery';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CreateEventGalleryModal = ({ refresh }: { refresh: () => void }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<IEventGallery>({
    title: '',
    tag: '',
    date: new Date().toISOString().slice(0, 10),
    cover_photo: '',
    folder_name: '',
  });

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const toggle = () => setOpen((v) => !v);
  const change = (e: any) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const upload = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'diecfwnp9',
          uploadPreset: 'jo9pp2yd',
          sources: ['local', 'url', 'camera'],
          folder: 'event_galleries',
          multiple: false,
          cropping: false,
          maxFileSize: 1500000,
        },
        (_err: any, result: any) => {
          if (result.event === 'success') {
            setForm((f) => ({ ...f, cover_photo: result.info.secure_url }));
          }
        },
      )
      .open();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createEventGallery(form);
      refresh();
      toggle();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={toggle}
        className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-1 hover:bg-blue-600"
      >
        <IoMdAddCircleOutline size={20} /> New Gallery
      </button>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={toggle}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <MdClose size={22} />
            </button>
            <h2 className="text-xl mb-4">Create Gallery</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                name="title"
                value={form.title}
                onChange={change}
                placeholder="Title"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                name="tag"
                value={form.tag}
                onChange={change}
                placeholder="Tag"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                type="date"
                name="date"
                value={form.date.slice(0, 10)}
                onChange={change}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                name="folder_name"
                value={form.folder_name}
                onChange={change}
                placeholder="Folder name"
                className="w-full px-3 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={upload}
                className="bg-purple-500 text-white px-3 py-2 rounded-md flex items-center gap-2 hover:bg-purple-600"
              >
                <FaImage size={20} /> Upload Cover
              </button>
              {form.cover_photo && (
                <img src={form.cover_photo} alt="cover" className="h-32 rounded-md" />
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
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

export default CreateEventGalleryModal;
