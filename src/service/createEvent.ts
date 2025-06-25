import axios from 'axios';
import { API_BASE_URL } from 'src/config';

export interface CreateEventPayload {
  space_name: string;
  space_description: string;
  category: string;
  booking_requirement: string;
  amenities: string;
  home_truths: string;
  opening_hours: {
    weekdays: string;
    weekend: string;
    off: string;
  };
  space_rules: string;
  startDate: string;
  endDate: string;
  location: {
    address: string;
    latitude: number;
    longitude: number;
  };
  location_description: string;
  bannerImage: File;
  otherImages: File[];
  floorPrintImage: File | null;
  tickets?: any;
  organizerId: string;
}

export const createEvent = async (eventData: CreateEventPayload): Promise<void> => {
  try {
    const formData = new FormData();

    formData.append('space_name', eventData.space_name);
    formData.append('space_description', eventData.space_description);
    formData.append('category', eventData.category);
    formData.append('booking_requirement', eventData.booking_requirement);
    formData.append('amenities', eventData.amenities);
    formData.append('home_truths', eventData.home_truths);

    // Opening hours
    formData.append('opening_hours[weekdays]', eventData.opening_hours.weekdays);
    formData.append('opening_hours[weekend]', eventData.opening_hours.weekend);
    formData.append('opening_hours[off]', eventData.opening_hours.off);

    formData.append('space_rules', eventData.space_rules);
    formData.append('startDate', eventData.startDate);
    formData.append('endDate', eventData.endDate);

    formData.append('location[address]', eventData.location.address);
    formData.append('location[latitude]', String(eventData.location.latitude));
    formData.append('location[longitude]', String(eventData.location.longitude));

    formData.append('location_description', eventData.location_description);
    formData.append('banner_Image', eventData.bannerImage);

    // Handle multiple other images
    // eventData.otherImages.forEach((file, index) => {
    //   formData.append(`other_images[${index}]`, file);
    // });

    // Floor print image (if exists)
    if (eventData.floorPrintImage) {
      formData.append('floor_print_image', eventData.floorPrintImage);
    }

    formData.append('tickets', JSON.stringify(eventData.tickets));
    formData.append('organizerId', eventData.organizerId);

    const response = await axios.post(`${API_BASE_URL}/api/v1/events/create-event`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    console.log('Event created successfully:', response.data);
  } catch (error) {
    console.error('Error creating event:', error);
  }
};
