import { useState, useEffect } from 'react';
import { MdClose } from 'react-icons/md';
import { updateDownload, IDownload } from 'src/services/download';

export default function EditDownloadModal({ data, isOpen, setIsOpen, refresh }: any) {
  const [form, setForm] = useState<IDownload>(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  const handleChange = (e: any) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const uploadPDF = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setForm((f) => ({ ...f, pdf_file: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updateDownload(data._id!, form);
      refresh();
      setIsOpen(false);
    } catch {
      console.error('Update failed');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md relative">
        <button onClick={() => setIsOpen(false)} className="absolute top-3 right-3">
          <MdClose size={22} />
        </button>
        <h2 className="text-xl mb-4">Edit Download</h2>
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
            value={form.programme || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input
            name="title"
            placeholder="Title"
            value={form.title || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
          />
          <input type="file" accept="application/pdf" onChange={uploadPDF} className="w-full" />
          {form.pdf_file && <p className="text-sm text-green-600">PDF selected</p>}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
