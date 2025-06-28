import axios from 'axios';

const API_BASE_URL = 'https://mpu-uni-server.onrender.com';

export interface IAcademicHighlight {
  _id?: string;
  order?: number | null;
  title?: string | null;
  text?: string | null;
  featured_image?: string | null;
  link_url?: string | null;
}

export const createAcademicHighlight = async (data: IAcademicHighlight) =>
  (await axios.post(`${API_BASE_URL}/api/v1/academic-highlight/create-academic-highlight`, data))
    .data;

export const getAllAcademicHighlights = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/academic-highlight/get-academic-highlights`)).data;

export const updateAcademicHighlight = async (id: string, data: Partial<IAcademicHighlight>) =>
  (
    await axios.put(
      `${API_BASE_URL}/api/v1/academic-highlight/update-academic-highlight/${id}`,
      data,
    )
  ).data;

export const deleteAcademicHighlight = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/academic-highlight/delete-academic-highlight/${id}`))
    .data;
