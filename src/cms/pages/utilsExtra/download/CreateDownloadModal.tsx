import { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { MdClose } from 'react-icons/md';
import { createDownload } from 'src/services/download';

export default function CreateDownloadModal({ refresh }: { refresh: () => void }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<any>({
    type: '',
    programme: '',
    title: '',
    pdf_file: '',
  });

  const handleChange = (e: any) => setForm((f: any) => ({ ...f, [e.target.name]: e.target.value }));

  const upload = () => {
    window.cloudinary
      .createUploadWidget(
        {
          cloudName: 'diecfwnp9',
          uploadPreset: 'jo9pp2yd',
          sources: ['local', 'url'],
          folder: 'downloads',
          multiple: false,
          cropping: false,
          maxFileSize: 1500000,
          resourceType: 'raw',
          clientAllowedFormats: ['pdf'],
        },
        (error: any, result: any) => {
          if (!error && result && result.event === 'success') {
            console.log('===>result pdf', result.info?.asset_id);
            setForm((prev: any) => ({
              ...prev,
              pdf_file: result.info.asset_id,
            }));
          }
        },
      )
      .open();
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!form.pdf_file) {
      alert('Please upload a PDF first.');
      return;
    }

    try {
      console.log('Final form data before API call:', form); // ✅ Confirm it
      await createDownload(form);
      refresh();
      setOpen(false);
    } catch (error) {
      console.error('Create failed', error);
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

              <button
                type="button"
                onClick={upload}
                className="w-full px-3 py-2 border rounded bg-gray-100 hover:bg-gray-200 transition"
              >
                Upload PDF from Cloudinary
              </button>

              {form.pdf_file && (
                <p className="text-sm text-green-600 break-words">✅ PDF uploaded successfully.</p>
              )}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  disabled={!form.pdf_file}
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
