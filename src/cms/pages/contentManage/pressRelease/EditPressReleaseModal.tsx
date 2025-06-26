import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { FaImage } from 'react-icons/fa6';
import { updatePressRelease, IPressRelease } from 'src/services/pressRelease';

declare global {
  interface Window {
    cloudinary: any;
  }
}

const EditPressReleaseModal = ({ data, isOpen, setIsOpen, refresh }: any) => {
  const [form, setForm] = useState<IPressRelease>(data);

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
          folder: 'press_releases',
          multiple: false,
          cropping: false,
        },
        (_err: any, result: any) => {
          if (result.event === 'success')
            setForm((f) => ({ ...f, scanned_jpg: result.info.secure_url }));
        },
      )
      .open();
  };

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await updatePressRelease(data?._id!, form);
      refresh();
      setIsOpen(false);
    } catch (e) {
      console.error(e);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-md w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-gray-600" onClick={() => setIsOpen(false)}>
          <MdClose size={22} />
        </button>
        <h2 className="text-xl mb-4">Edit Press Release</h2>
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
          <button
            type="button"
            onClick={upload}
            className="bg-purple-500 text-white px-3 py-2 rounded-md flex items-center gap-2"
          >
            <FaImage size={20} /> Upload PDF/JPG
          </button>
          {form?.scanned_jpg && (
            <img src={form?.scanned_jpg} alt="preview" className="h-32 rounded-md" />
          )}
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

export default EditPressReleaseModal;
