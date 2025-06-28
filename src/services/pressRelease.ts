import axios from 'axios';

const API_BASE_URL = 'https://mpu-uni-server.onrender.com';

export interface IPressRelease {
  _id?: string;
  date?: string | null;
  title?: string | null;
  scanned_jpg?: string | null;
}

export const createPressRelease = async (data: IPressRelease) =>
  (await axios.post(`${API_BASE_URL}/api/v1/press-release/create-press-release`, data)).data;

export const getAllPressReleases = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/press-release/get-press-releases`)).data;

export const updatePressRelease = async (id: string, data: Partial<IPressRelease>) =>
  (await axios.put(`${API_BASE_URL}/api/v1/press-release/update-press-release/${id}`, data)).data;

export const deletePressRelease = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/press-release/delete-press-release/${id}`)).data;
