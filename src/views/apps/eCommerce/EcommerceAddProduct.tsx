import GeneralDetail from 'src/components/apps/ecommerce/addProduct/GeneralDetail';
import Pricing from 'src/components/apps/ecommerce/addProduct/Pricing';
import ProductData from 'src/components/apps/ecommerce/addProduct/ProductData';
import Status from 'src/components/apps/ecommerce/addProduct/Status';
import Variation from 'src/components/apps/ecommerce/addProduct/Variation';
import Thumbnail from 'src/components/apps/ecommerce/editProduct/Thumbnail';
import BreadcrumbComp from 'src/layouts/full/shared/breadcrumb/BreadcrumbComp';
import { Button } from 'flowbite-react';
import { useContext, useState } from 'react';
import { createEvent, CreateEventPayload } from 'src/service/createEvent';
// import { useNavigate } from 'react-router';
import { AuthContext } from 'src/context/authContext/AuthContext';
import LockScreen from 'src/views/authentication/lockScreen/LockScreen';
import AdditionalDetails from 'src/components/apps/ecommerce/addProduct/AdditionalDetails';
import AddFoodPrint from 'src/components/apps/ecommerce/addProduct/AddFoodPrint';
import AddOtherImages from 'src/components/apps/ecommerce/editProduct/addOtherImages';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Add Space',
  },
];

const AddProduct = () => {
  const { user }: any = useContext(AuthContext);
  const [eventData, setEventData] = useState({
    space_name: '',
    space_description: '',
    category: '',
    booking_requirement: '',
    amenities: '',
    home_truths: '',
    opening_hours: {
      weekdays: '',
      weekend: '',
      off: '',
    },
    space_rules: '',
    type: '',
    startDate: '',
    endDate: '',
    area: '',
    location: {
      address: '',
      latitude: 0,
      longitude: 0,
    },
    location_description: '',
    banner_Image: null,
    other_images: [],
    floor_print_image: null,
    tickets: [],
    organizerId: user?._id,
  });

  const [banner, setBanner] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [otherImages, setOtherImages] = useState<File[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleBannerChange = (file: File) => {
    setBannerFile(file);
  };

  const handleOtherImagesChange = (files: File[]) => {
    setOtherImages((prevImages) => [...prevImages, ...files]);
  };

  const [floorPrintImage, setFloorPrintImage] = useState<File | null>(null);

  const handleFloorPrintChange = (file: File) => {
    setFloorPrintImage(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!bannerFile) {
      alert('Please upload a banner image');
      return;
    }

    const eventPayload: CreateEventPayload = {
      ...eventData,
      bannerImage: bannerFile,
      otherImages: otherImages,
      floorPrintImage: floorPrintImage,
    };

    console.log('Submitting event:', eventPayload);
    await createEvent(eventPayload);
    // navigate('/Event/list');
  };

  return (
    <>
      {/* <LockScreen /> */}
      <BreadcrumbComp title="Add Space" items={BCrumb} />
      <div className="grid grid-cols-12 gap-[30px]">
        <div className="lg:col-span-8 col-span-12">
          <div className="flex flex-col gap-[30px]">
            {/* General */}
            <GeneralDetail
              title={eventData.space_name}
              description={eventData.space_description}
              handleChange={handleChange}
              booking_requirement={eventData.booking_requirement}
            />
            <Variation eventData={eventData} setEventData={setEventData} />
            <Pricing eventData={eventData} setEventData={setEventData} />
            <div className="flex gap-5">
              <AddFoodPrint onFloorPrintChange={handleFloorPrintChange} />
              <AddOtherImages onOtherImagesChange={handleOtherImagesChange} />
            </div>
          </div>
        </div>
        <div className="lg:col-span-4 col-span-12">
          <div className="flex flex-col gap-[30px]">
            <Thumbnail onBannerChange={handleBannerChange} setBanner={setBanner} banner={banner} />
            <Status eventData={eventData} setEventData={setEventData} />
            <ProductData eventData={eventData} setEventData={setEventData} />
            <AdditionalDetails
              booking_requirement={eventData.booking_requirement}
              amenities={eventData.amenities}
              eventRules={eventData.space_rules}
              home_truths={eventData.home_truths}
              handleChange={handleChange}
              handleAmenitiesChange={(selectedAmenities) =>
                setEventData((prevData) => ({
                  ...prevData,
                  amenities: selectedAmenities.join(', '), // Convert array to comma-separated string
                }))
              }
            />
          </div>
        </div>
        <div className="lg:col-span-8 col-span-12">
          <div className="sm:flex gap-3">
            <Button color={'primary'} className="sm:mb-0 mb-3 w-fit" onClick={handleSubmit}>
              Save changes
            </Button>
            <Button color={'lighterror'} className="w-fit">
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;
