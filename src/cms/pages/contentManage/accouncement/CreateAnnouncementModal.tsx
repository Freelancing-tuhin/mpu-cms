import { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { createAnnouncement } from 'src/services/announcement';

const CreateAnnouncementModal = ({ refresh }: { refresh: () => void }) => {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({
    date: new Date().toISOString().slice(0, 10),
    title: '',
    link_url: '',
  });

  const toggle = () => setOpen((v) => !v);
  const change = (e: any) => setForm((f: any) => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: any) => {
    e.preventDefault();
    try {
      await createAnnouncement(form);
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
        <IoMdAddCircleOutline size={20} /> Add Announcement
      </button>

      {open && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button
              onClick={toggle}
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
            >
              <MdClose size={22} />
            </button>
            <h2 className="text-xl mb-4">New Announcement</h2>
            <form onSubmit={submit} className="space-y-4">
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={change}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={change}
                className="w-full px-3 py-2 border rounded-md"
              />
              <input
                name="link_url"
                placeholder="Link URL"
                value={form.link_url}
                onChange={change}
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

export default CreateAnnouncementModal;
