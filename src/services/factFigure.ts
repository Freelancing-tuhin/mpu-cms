import axios from 'axios';

const API_BASE_URL = 'https://mpu-uni-server.onrender.com';

export interface IFactFigure {
  _id?: string;
  priority?: number | null;
  caption?: string | null;
  figure?: number | null;
  icon?: string | null;
}

export const createFactFigure = async (data: IFactFigure) => {
  const res = await axios.post(`${API_BASE_URL}/api/v1/fact-figure/create-fact-figure`, data);
  return res.data;
};

export const getAllFactFigures = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/v1/fact-figure/get-fact-figures`);
  return res.data;
};

export const updateFactFigure = async (id: string, data: Partial<IFactFigure>) => {
  const res = await axios.put(`${API_BASE_URL}/api/v1/fact-figure/update-fact-figure/${id}`, data);
  return res.data;
};

export const deleteFactFigure = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/api/v1/fact-figure/delete-fact-figure/${id}`);
  return res.data;
};
