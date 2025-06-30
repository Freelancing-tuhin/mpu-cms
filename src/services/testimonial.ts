import axios from 'axios';

const API_BASE_URL = 'https://mpu.kreativeteam.in';

export interface ITestimonial {
  _id?: string;
  order?: number | null;
  type?: 'Alumni' | 'Recruiter' | 'Student';
  title?: string | null;
  brief?: string | null;
  image_icon?: string | null;
  sender_name?: string | null;
  sender_profession?: string | null;
  external_url?: string | null;
}

export const createTestimonial = async (data: ITestimonial) =>
  (await axios.post(`${API_BASE_URL}/api/v1/testimonial/create-testimonial`, data)).data;

export const getAllTestimonials = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/testimonial/get-testimonials`)).data;

export const updateTestimonial = async (id: string, data: Partial<ITestimonial>) =>
  (await axios.put(`${API_BASE_URL}/api/v1/testimonial/update-testimonial/${id}`, data)).data;

export const deleteTestimonial = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/testimonial/delete-testimonial/${id}`)).data;
