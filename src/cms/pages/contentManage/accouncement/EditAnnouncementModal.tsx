import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { updateAnnouncement, IAnnouncement } from 'src/services/announcement';

const EditAnnouncementModal = ({ data, isOpen, setIsOpen, refresh }: any) => {
  const [form, setForm] = useState<IAnnouncement>(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const change = (e: any) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await updateAnnouncement(data._id!, form);
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
        <h2 className="text-xl mb-4">Edit Announcement</h2>
        <form onSubmit={submit} className="space-y-4">
          <input
            type="date"
            name="date"
            value={form?.date || ''}
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
            name="link_url"
            placeholder="Link URL"
            value={form?.link_url || ''}
            onChange={change}
            className="w-full px-3 py-2 border rounded-md"
          />
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

export default EditAnnouncementModal;
