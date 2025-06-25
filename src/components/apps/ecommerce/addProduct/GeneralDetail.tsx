import { Label, TextInput } from 'flowbite-react';
import CardBox from 'src/components/shared/CardBox';

interface GeneralDetailProps {
  title: string;
  description: string;
  booking_requirement: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const GeneralDetail: React.FC<GeneralDetailProps> = ({
  title,
  description,
  handleChange,
  // booking_requirement,
}) => {
  return (
    <CardBox>
      <h5 className="card-title mb-4">General Details</h5>

      {/* Title Input */}
      <div className="mb-4">
        <div className="mb-2 block">
          <Label htmlFor="prednm" value="Space Name" />
          <span className="text-error ms-1">*</span>
        </div>
        <TextInput
          id="prednm"
          name="space_name"
          type="text"
          value={title}
          onChange={handleChange}
          sizing="md"
          className="form-control"
          placeholder="Space Name"
        />
        <small className="text-xs text-darklink dark:text-bodytext">
          An event name is required and recommended to be unique.
        </small>
      </div>

      {/* Description Input */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="desc" value="Description" />
        </div>
        <TextInput
          id="desc"
          name="space_description"
          type="text"
          value={description}
          onChange={handleChange}
          sizing="lg"
          className="form-control"
          placeholder="Space Details"
        />
        <small className="text-xs text-darklink dark:text-bodytext">
          Set a description for better visibility.
        </small>
      </div>
    </CardBox>
  );
};

export default GeneralDetail;
