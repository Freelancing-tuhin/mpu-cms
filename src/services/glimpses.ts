import axios from 'axios';

const API_BASE_URL = 'https://mpu.kreativeteam.in';

export interface IGlimpses {
  _id?: string;
  order?: number | null;
  title?: string | null;
  text?: string | null;
  featured_image?: string | null;
  link_url?: string | null;
}

export const createGlimpses = async (data: IGlimpses) =>
  (await axios.post(`${API_BASE_URL}/api/v1/glimpses/create-glimpses`, data)).data;

export const getAllGlimpses = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/glimpses/get-glimpses`)).data;

export const updateGlimpses = async (id: string, data: Partial<IGlimpses>) =>
  (await axios.put(`${API_BASE_URL}/api/v1/glimpses/update-glimpses/${id}`, data)).data;

export const deleteGlimpses = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/glimpses/delete-glimpses/${id}`)).data;
