import { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { createCarousel, ICarousel } from 'src/services/carousel';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const CreateCarouselModal = ({ refresh }: { refresh: () => void }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<ICarousel>({
    order: null,
    title: '',
    text: '',
    slide_image: '',
    link_url: '',
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
          folder: 'carousel_slides',
          cropping: false,
          multiple: false,
          maxFileSize: 1500000,
        },
        (_err: any, result: any) => {
          if (result.event === 'success') {
            setForm((f) => ({ ...f, slide_image: result.info.secure_url }));
          }
        },
      )
      .open();
  };

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await createCarousel(form);
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
        <IoMdAddCircleOutline size={20} /> Add Slide
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg relative">
            <button
              onClick={toggle}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <MdClose size={22} />
            </button>
            <h2 className="text-xl mb-4">New Slide</h2>
            <form onSubmit={submit} className="space-y-4">
              <input
                name="order"
                type="number"
                value={form.order ?? ''}
                onChange={change}
                placeholder="Order"
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                name="title"
                value={form.title}
                onChange={change}
                placeholder="Title"
                className="w-full px-3 py-2 border rounded-md"
              />
              <textarea
                name="text"
                value={form.text}
                onChange={change}
                placeholder="Text"
                className="w-full px-3 py-2 border rounded-md"
              />
              <button
                type="button"
                onClick={upload}
                className="bg-purple-500 text-white px-3 py-2 rounded-md flex items-center gap-2 hover:bg-purple-600"
              >
                <FaImage size={20} /> Upload Image
              </button>
              {form.slide_image && (
                <img src={form.slide_image} alt="preview" className="h-32 rounded-md" />
              )}
              <input
                name="link_url"
                value={form.link_url}
                onChange={change}
                placeholder="Link URL"
                className="w-full px-3 py-2 border rounded-md"
              />
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

export default CreateCarouselModal;
