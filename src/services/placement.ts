import axios from 'axios';

const API_BASE_URL = 'http://localhost:8989';

export interface IPlacement {
  _id?: string;
  order?: number | null;
  title?: string | null;
  brief?: string | null;
  featured_image?: string | null;
  link_url?: string | null;
}

export const createPlacement = async (data: IPlacement) => {
  const res = await axios.post(`${API_BASE_URL}/api/v1/placement/create-placement`, data);
  return res.data;
};

export const getAllPlacements = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/v1/placement/get-placements`);
  return res.data;
};

export const updatePlacement = async (id: string, data: Partial<IPlacement>) => {
  const res = await axios.put(`${API_BASE_URL}/api/v1/placement/update-placement/${id}`, data);
  return res.data;
};

export const deletePlacement = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/api/v1/placement/delete-placement/${id}`);
  return res.data;
};
