import { useEffect, useState } from 'react';
import { updateFactFigure } from 'src/services/factFigure';
import { MdClose } from 'react-icons/md';

const EditFactFigureModal = ({ isOpen, setIsOpen, data, getFactFigures }: any) => {
  const [formData, setFormData] = useState<any>(data);

  const toggle = () => setIsOpen(false);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await updateFactFigure(data._id, formData);
      getFactFigures();
      toggle();
    } catch (err) {
      console.error(err);
    }
  };

  return isOpen ? (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] relative">
        <button className="absolute top-3 right-3" onClick={toggle}>
          <MdClose size={22} />
        </button>
        <h2 className="text-xl mb-4">Edit Fact & Figure</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="priority"
            type="number"
            value={formData.priority}
            onChange={handleChange}
            placeholder="Priority"
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            name="caption"
            value={formData.caption}
            onChange={handleChange}
            placeholder="Caption"
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            name="figure"
            type="number"
            value={formData.figure}
            onChange={handleChange}
            placeholder="Figure"
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            name="icon"
            value={formData.icon}
            onChange={handleChange}
            placeholder="Icon class"
            className="w-full border px-3 py-2 rounded-md"
          />
          <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md">
            Update
          </button>
        </form>
      </div>
    </div>
  ) : null;
};

export default EditFactFigureModal;
