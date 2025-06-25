import { Icon } from '@iconify/react/dist/iconify.js';
import { Label } from 'flowbite-react';
import React, { useState } from 'react';
import CardBox from 'src/components/shared/CardBox';

interface AddOtherImagesProps {
  onOtherImagesChange: (files: File[]) => void;
}

const AddOtherImages: React.FC<AddOtherImagesProps> = ({ onOtherImagesChange }) => {
  const [otherImages, setOtherImages] = useState<{ src: string; file: File }[]>([]);

  const handleOtherImagesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const files = Array.from(event.target.files);
      const newImages = files.map((file) => ({
        src: URL.createObjectURL(file),
        file,
      }));

      setOtherImages((prev) => [...prev, ...newImages]);
      onOtherImagesChange([...otherImages.map((img) => img.file), ...files]); // Send updated files to parent
    }
  };

  const removeImage = (index: number) => {
    const updatedImages = otherImages.filter((_, i) => i !== index);
    setOtherImages(updatedImages);
    onOtherImagesChange(updatedImages.map((img) => img.file)); // Update parent state
  };

  return (
    <CardBox>
      <h5 className="card-title mb-4">Other Images</h5>
      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="other-images"
          className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[1px] border-dashed border-primary bg-lightprimary"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <Icon
              icon="solar:cloud-upload-outline"
              height={32}
              className="mb-3 text-darklink dark:text-bodytext"
            />
            <p className="mb-2 text-sm text-darklink dark:text-bodytext">
              Drop images here to upload
            </p>
          </div>
          <input
            id="other-images"
            className="hidden"
            type="file"
            accept="image/*"
            multiple
            onChange={handleOtherImagesChange}
          />
        </Label>
      </div>
      <small className="text-xs text-darklink dark:text-bodytext text-center">
        Upload multiple images. Only *.png, *.jpg, and *.jpeg files are accepted.
      </small>
      {/* Image Previews */}
      <div className="mt-3 grid grid-cols-3 gap-3">
        {otherImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image.src}
              alt={`Other Image ${index + 1}`}
              className="h-24 w-full object-cover rounded-lg"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute -top-2 -right-2 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full shadow-md hover:bg-red-700 transition"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </CardBox>
  );
};

export default AddOtherImages;
