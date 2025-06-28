import axios from 'axios';

const API_BASE_URL = 'https://mpu-uni-server.onrender.com';

export interface IGallery {
  _id?: string;
  date?: string | null;
  title?: string | null;
  tag?: string | null;
  cover_photo?: string | null;
  folder_name?: string | null;
}

export const createGallery = async (data: IGallery) =>
  (await axios.post(`${API_BASE_URL}/api/v1/gallery/create-gallery`, data)).data;

export const getAllGalleries = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/gallery/get-galleries`)).data;

export const updateGallery = async (id: string, data: Partial<IGallery>) =>
  (await axios.put(`${API_BASE_URL}/api/v1/gallery/update-gallery/${id}`, data)).data;

export const deleteGallery = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/gallery/delete-gallery/${id}`)).data;
