import axios from 'axios';
export const BASE_ADDRESS = 'http://web.youngshinebd.com:5001';
export const BASE_URL = 'http://web.youngshinebd.com:5001/api/v1';

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
