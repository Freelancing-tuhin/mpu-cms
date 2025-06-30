import axios from 'axios';

const API_BASE_URL = 'https://mpu.kreativeteam.in';

export interface IYouTube {
  _id?: string;
  date?: string | null;
  title?: string | null;
  about?: string | null;
  thumbnail?: string | null;
  youtube_id?: string | null;
}

export const createYouTube = async (data: IYouTube) =>
  (await axios.post(`${API_BASE_URL}/api/v1/youtube/create-youtube`, data)).data;

export const getAllYouTube = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/youtube/get-youtube`)).data;

export const updateYouTube = async (id: string, data: Partial<IYouTube>) =>
  (await axios.put(`${API_BASE_URL}/api/v1/youtube/update-youtube/${id}`, data)).data;

export const deleteYouTube = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/youtube/delete-youtube/${id}`)).data;
