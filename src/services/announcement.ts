import axios from 'axios';

const API_BASE_URL = 'http://localhost:8989';

export interface IAnnouncement {
  _id?: string;
  date?: string | null;
  title?: string | null;
  link_url?: string | null;
}

export const createAnnouncement = async (data: IAnnouncement) =>
  (await axios.post(`${API_BASE_URL}/api/v1/announcement/create-announcement`, data)).data;

export const getAllAnnouncements = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/announcement/get-announcements`)).data;

export const updateAnnouncement = async (id: string, data: Partial<IAnnouncement>) =>
  (await axios.put(`${API_BASE_URL}/api/v1/announcement/update-announcement/${id}`, data)).data;

export const deleteAnnouncement = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/announcement/delete-announcement/${id}`)).data;
