import axios from 'axios';

const API_BASE_URL = 'https://mpu-uni-server.onrender.com';

export interface IDownload {
  _id?: string;
  type: 'syllabus' | 'scheme';
  programme?: string | null;
  title?: string | null;
  pdf_file?: string | null;
}

export const createDownload = async (formData: FormData) =>
  (
    await axios.post(`${API_BASE_URL}/api/v1/downloads/create-download`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  ).data;
export const getAllDownloads = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/downloads/get-downloads`)).data;

export const updateDownload = async (id: string, data: Partial<IDownload>) =>
  (await axios.put(`${API_BASE_URL}/api/v1/downloads/update-download/${id}`, data)).data;

export const deleteDownload = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/downloads/delete-download/${id}`)).data;
