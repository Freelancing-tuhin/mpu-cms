import { useState } from 'react';
import { createFactFigure } from 'src/services/factFigure';
import { MdClose } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';

const CreateFactFigureModal = ({ getFactFigures }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState<any>({
    priority: '',
    caption: '',
    figure: '',
    icon: '',
  });

  const toggle = () => setIsOpen(!isOpen);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      await createFactFigure(formData);
      getFactFigures();
      toggle();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={toggle}
        className="bg-blue-500 flex items-center gap-1 text-white px-4 py-2.5 rounded-md hover:bg-blue-600 transition-all"
      >
        <IoMdAddCircleOutline size={20} />
        Add Fact
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg w-[500px] relative">
            <button className="absolute top-3 right-3" onClick={toggle}>
              <MdClose size={22} />
            </button>
            <h2 className="text-xl mb-4">Add Fact & Figure</h2>
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
                Save
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateFactFigureModal;
