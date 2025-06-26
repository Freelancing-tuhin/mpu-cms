// src/api/school.api.ts
import axios from 'axios';

const API_BASE_URL = 'http://localhost:8989'; // Adjust if needed

// Types (Optional if you're already using ISchool from a shared types package)
export interface ISchool {
  _id?: string;
  order?: number | null;
  title?: string | null;
  brief?: string | null;
  logo?: string | null;
  link_url?: string | null;
}

// 🔹 Create School
export const createSchool = async (data: ISchool) => {
  const res = await axios.post(`${API_BASE_URL}/api/v1/school/create-school`, data);
  return res.data;
};

// 🔹 Get All Schools
export const getAllSchools = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/v1/school/get-schools`);
  return res.data;
};

// 🔹 Update School
export const updateSchool = async (id: string, data: Partial<ISchool>) => {
  const res = await axios.put(`${API_BASE_URL}/api/v1/school/update-school/${id}`, data);
  return res.data;
};

// 🔹 Delete School
export const deleteSchool = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/api/v1/school/delete-school/${id}`);
  return res.data;
};
