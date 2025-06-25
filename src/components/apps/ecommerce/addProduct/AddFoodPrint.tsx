import { Icon } from '@iconify/react/dist/iconify.js';
import { Label } from 'flowbite-react';
import React, { useState } from 'react';
import CardBox from 'src/components/shared/CardBox';

interface AddFoodPrintProps {
  onFloorPrintChange: (file: File) => void;
}

const AddFoodPrint: React.FC<AddFoodPrintProps> = ({ onFloorPrintChange }) => {
  const [floorPrint, setFloorPrint] = useState<string | null>(null);

  const handleFloorPrintChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setFloorPrint(URL.createObjectURL(file)); // Preview image
      onFloorPrintChange(file); // Send actual file
    }
  };

  return (
    <CardBox>
      <h5 className="card-title mb-4">Floor Print</h5>
      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="floorprint-file"
          className="flex w-full cursor-pointer flex-col items-center justify-center rounded-xl border-[1px] border-dashed border-primary bg-lightprimary"
        >
          <div className="flex flex-col items-center justify-center pb-6 pt-5">
            <Icon
              icon="solar:cloud-upload-outline"
              height={32}
              className="mb-3 text-darklink dark:text-bodytext"
            />
            <p className="mb-2 text-sm text-darklink dark:text-bodytext">
              Drop Floor Print here to upload
            </p>
          </div>
          <input
            id="floorprint-file"
            className="hidden"
            type="file"
            accept="image/*"
            onChange={handleFloorPrintChange}
          />
        </Label>
      </div>
      <small className="text-xs text-darklink dark:text-bodytext text-center">
        Only *.png, *.jpg, and *.jpeg image files are accepted.
      </small>
      {floorPrint && (
        <img
          src={floorPrint}
          alt="Floor Print Preview"
          className="mt-3 h-48 w-full object-cover rounded-lg border"
        />
      )}
    </CardBox>
  );
};

export default AddFoodPrint;
