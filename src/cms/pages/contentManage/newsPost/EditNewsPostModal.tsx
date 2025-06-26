import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { updateNewsPost, INewsPost } from 'src/services/newsPost';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const EditNewsPostModal = ({ data, isOpen, setIsOpen, refresh }: any) => {
  const [form, setForm] = useState<INewsPost>(data);

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
          folder: 'news_posts',
          multiple: false,
          cropping: false,
        },
        (_err: any, res: any) => {
          if (res.event === 'success')
            setForm((f) => ({ ...f, featured_image: res.info.secure_url }));
        },
      )
      .open();
  };

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await updateNewsPost(data._id!, form);
      refresh();
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 w-full max-w-lg rounded-md relative">
        <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3 text-gray-600">
          <MdClose size={22} />
        </button>
        <h2 className="text-xl mb-4">Edit News Post</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="date"
            name="date"
            value={form?.date?.slice(0, 10)}
            onChange={change}
            className="border w-full px-3 py-2 rounded-md"
          />
          <input
            name="title"
            value={form?.title || ''}
            onChange={change}
            placeholder="Title"
            className="border w-full px-3 py-2 rounded-md"
          />
          <input
            name="tag"
            value={form?.tag || ''}
            onChange={change}
            placeholder="Tag"
            className="border w-full px-3 py-2 rounded-md"
          />
          <textarea
            name="short_news"
            value={form?.short_news || ''}
            onChange={change}
            placeholder="Short News"
            className="border w-full px-3 py-2 rounded-md"
          />
          <button
            type="button"
            onClick={upload}
            className="bg-purple-500 text-white px-3 py-2 rounded-md flex items-center gap-2"
          >
            <FaImage size={20} /> Upload Image
          </button>
          {form?.featured_image && (
            <img src={form?.featured_image} alt="preview" className="h-32 rounded-md" />
          )}
          <div className="flex justify-end">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded-md">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditNewsPostModal;
