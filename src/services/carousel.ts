import axios from 'axios';

const API_BASE_URL = 'https://mpu-uni-server.onrender.com';

export interface ICarousel {
  _id?: string;
  order?: number | null;
  title?: string | null;
  text?: string | null;
  slide_image?: string | null;
  link_url?: string | null;
}

export const createCarousel = async (data: ICarousel) =>
  (await axios.post(`${API_BASE_URL}/api/v1/carousel/create-carousel`, data)).data;

export const getAllCarousels = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/carousel/get-carousels`)).data;

export const updateCarousel = async (id: string, data: Partial<ICarousel>) =>
  (await axios.put(`${API_BASE_URL}/api/v1/carousel/update-carousel/${id}`, data)).data;

export const deleteCarousel = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/carousel/delete-carousel/${id}`)).data;
