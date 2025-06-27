import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { updateGallery, IGallery } from 'src/services/gallery';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const EditGalleryModal = ({ data, isOpen, setIsOpen, refresh }: any) => {
  const [form, setForm] = useState<IGallery>(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const change = (e: any) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const upload = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'diecfwnp9',
          uploadPreset: 'jo9pp2yd',
          sources: ['local', 'url', 'camera'],
          folder: 'galleries',
          cropping: false,
          multiple: false,
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

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await updateGallery(data._id!, form);
      refresh();
      setIsOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          <MdClose size={22} />
        </button>
        <h2 className="text-xl mb-4">Edit Gallery</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="date"
            name="date"
            value={form?.date?.slice(0, 10) || ''}
            onChange={change}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            name="title"
            placeholder="Title"
            value={form?.title || ''}
            onChange={change}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            name="tag"
            placeholder="Tag"
            value={form?.tag || ''}
            onChange={change}
            className="w-full px-3 py-2 border rounded-md"
          />
          <input
            name="folder_name"
            placeholder="Folder name"
            value={form?.folder_name || ''}
            onChange={change}
            className="w-full px-3 py-2 border rounded-md"
          />
          <button
            type="button"
            onClick={upload}
            className="bg-purple-500 text-white px-3 py-2 rounded-md flex items-center gap-2 hover:bg-purple-600"
          >
            <FaImage size={20} /> Upload Cover
          </button>
          {form?.cover_photo && (
            <img src={form?.cover_photo} alt="preview" className="h-32 rounded-md" />
          )}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditGalleryModal;
