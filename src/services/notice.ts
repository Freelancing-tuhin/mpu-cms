import axios from 'axios';

const API_BASE_URL = 'https://mpu-uni-server.onrender.com';

export interface INotice {
  _id?: string;
  date?: string | null;
  title?: string | null;
  link_url?: string | null;
}

export const createNotice = async (data: INotice) =>
  (await axios.post(`${API_BASE_URL}/api/v1/notice/create-notice`, data)).data;

export const getAllNotices = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/notice/get-notices`)).data;

export const updateNotice = async (id: string, data: Partial<INotice>) =>
  (await axios.put(`${API_BASE_URL}/api/v1/notice/update-notice/${id}`, data)).data;

export const deleteNotice = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/notice/delete-notice/${id}`)).data;
