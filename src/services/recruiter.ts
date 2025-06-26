import axios from 'axios';

const API_BASE_URL = 'http://localhost:8989';

export interface IRecruiter {
  _id?: string;
  order?: number | null;
  title?: string | null;
  brief?: string | null;
  featured_image?: string | null;
  link_url?: string | null;
}

export const createRecruiter = async (data: IRecruiter) => {
  const res = await axios.post(`${API_BASE_URL}/api/v1/recruiter/create-recruiter`, data);
  return res.data;
};

export const getAllRecruiters = async () => {
  const res = await axios.get(`${API_BASE_URL}/api/v1/recruiter/get-recruiters`);
  return res.data;
};

export const updateRecruiter = async (id: string, data: Partial<IRecruiter>) => {
  const res = await axios.put(`${API_BASE_URL}/api/v1/recruiter/update-recruiter/${id}`, data);
  return res.data;
};

export const deleteRecruiter = async (id: string) => {
  const res = await axios.delete(`${API_BASE_URL}/api/v1/recruiter/delete-recruiter/${id}`);
  return res.data;
};
