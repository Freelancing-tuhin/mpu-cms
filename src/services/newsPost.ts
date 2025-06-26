import axios from 'axios';

const API_BASE_URL = 'http://localhost:8989';

export interface INewsPost {
  _id?: string;
  date?: string | null;
  title?: string | null;
  tag?: string | null;
  short_news?: string | null;
  featured_image?: string | null;
}

export const createNewsPost = async (data: INewsPost) =>
  (await axios.post(`${API_BASE_URL}/api/v1/news-post/create-news-post`, data)).data;

export const getAllNewsPosts = async () =>
  (await axios.get(`${API_BASE_URL}/api/v1/news-post/get-news-posts`)).data;

export const updateNewsPost = async (id: string, data: Partial<INewsPost>) =>
  (await axios.put(`${API_BASE_URL}/api/v1/news-post/update-news-post/${id}`, data)).data;

export const deleteNewsPost = async (id: string) =>
  (await axios.delete(`${API_BASE_URL}/api/v1/news-post/delete-news-post/${id}`)).data;
