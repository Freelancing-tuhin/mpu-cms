import { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { createDownload } from 'src/services/download';

export default function CreateDownloadModal({ refresh }: { refresh: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    type: 'syllabus',
    programme: '',
    title: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert('Please upload a PDF first.');
      return;
    }

    const formData: any = new FormData();
    formData.append('type', form.type);
    formData.append('programme', form.programme);
    formData.append('title', form.title);
    formData.append('pdf_file', file);

    try {
      await createDownload(formData);
      refresh();
      setOpen(false);
    } catch (error) {
      console.error('Upload failed', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-1 hover:bg-blue-600"
      >
        <IoMdAddCircleOutline size={20} /> New Download
      </button>

      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
            <button onClick={() => setOpen(false)} className="absolute top-3 right-3">
              <MdClose size={22} />
            </button>
            <h2 className="text-xl mb-4">Create Download</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              >
                <option value="syllabus">Syllabus</option>
                <option value="scheme">Scheme</option>
              </select>
              <input
                name="programme"
                placeholder="Programme"
                value={form.programme}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                name="title"
                placeholder="Title"
                value={form.title}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded"
              />
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="w-full px-3 py-2 border rounded"
              />

              {file && (
                <p className="text-sm text-green-600 break-words">✅ PDF selected: {file.name}</p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  disabled={!file}
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
}
