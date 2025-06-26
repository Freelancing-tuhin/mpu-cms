import axios from 'axios';

const API_BASE_URL = 'http://localhost:8989'; // Update if using ENV later

export interface ICampusLifeHighlight {
  _id?: string;
  order?: number | null;
  title?: string | null;
  brief?: string | null;
  featured_image?: string | null;
  link_url?: string | null;
}

// 🔹 Create Campus Life Highlight
export const createCampusLifeHighlight = async (data: ICampusLifeHighlight) => {
  const res = await axios.post(`${API_BASE_URL}/api/v1/campus-life/create-highlight`, data);
  return res.data;
};

// 🔹 Get All Campus Life Highlights
export const getAllCampusLifeHighlights = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/v1/campus-life/get-highlights`);
  return res.data;
};

// 🔹 Update Campus Life Highlight
export const updateCampusLifeHighlight = async (
  id: string,
  data: Partial<ICampusLifeHighlight>,
) => {
  const res = await axios.put(`${API_BASE_URL}/api/v1/campus-life/update-highlight/${id}`, data);
  return res.data;
};

// 🔹 Delete Campus Life Highlight
export const deleteCampusLifeHighlight = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/api/v1/campus-life/delete-highlight/${id}`);
  return res.data;
};
