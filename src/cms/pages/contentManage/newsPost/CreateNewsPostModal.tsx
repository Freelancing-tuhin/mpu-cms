import { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { createNewsPost } from 'src/services/newsPost';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CreateNewsPostModal = ({ refresh }: { refresh: () => void }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({
    date: new Date().toISOString().slice(0, 10),
    title: '',
    tag: '',
    short_news: '',
    featured_image: '',
  });

  useEffect(() => {
    const s = document.createElement('script');
    s.src = 'https://widget.cloudinary.com/v2.0/global/all.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);

  const toggle = () => setOpen((v) => !v);
  const change = (e: any) => setForm((f: any) => ({ ...f, [e.target.name]: e.target.value }));

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
            setForm((f: any) => ({ ...f, featured_image: res.info.secure_url }));
        },
      )
      .open();
  };

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await createNewsPost(form);
      refresh();
      toggle();
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
        <IoMdAddCircleOutline size={20} /> Add News
      </button>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white p-6 w-full max-w-lg rounded-md relative">
            <button onClick={toggle} className="absolute top-3 right-3 text-gray-600">
              <MdClose size={22} />
            </button>
            <h2 className="text-xl mb-4">New News Post</h2>
            <form onSubmit={submit} className="space-y-4">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={change}
                className="border w-full px-3 py-2 rounded-md"
              />
              <input
                name="title"
                placeholder="Title"
                onChange={change}
                className="border w-full px-3 py-2 rounded-md"
              />
              <input
                name="tag"
                placeholder="Tag"
                onChange={change}
                className="border w-full px-3 py-2 rounded-md"
              />
              <textarea
                name="short_news"
                placeholder="Short News"
                onChange={change}
                className="border w-full px-3 py-2 rounded-md"
              />
              <button
                type="button"
                onClick={upload}
                className="bg-purple-500 text-white px-3 py-2 rounded-md flex items-center gap-2"
              >
                <FaImage size={20} /> Upload Image
              </button>
              {form.featured_image && (
                <img src={form.featured_image} alt="preview" className="h-32 rounded-md" />
              )}
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

export default CreateNewsPostModal;
