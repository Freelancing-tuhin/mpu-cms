import axios from 'axios';

const API_BASE_URL = 'https://mpu.kreativeteam.in';

export interface IEventGallery {
  _id?: string;
  title?: string | null;
  tag?: string | null;
  date?: string | null;
  cover_photo?: string | null;
  folder_name?: string | null;
}

export const createEventGallery = async (data: IEventGallery) =>
  (await axios.post(`${API_BASE_URL}/api/v1/event-gallery/create-event-gallery`, data)).data;

export const getAllEventGalleries = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/event-gallery/get-event-galleries`)).data;

export const updateEventGallery = async (id: string, data: Partial<IEventGallery>) =>
  (await axios.put(`${API_BASE_URL}/api/v1/event-gallery/update-event-gallery/${id}`, data)).data;

export const deleteEventGallery = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/event-gallery/delete-event-gallery/${id}`)).data;
