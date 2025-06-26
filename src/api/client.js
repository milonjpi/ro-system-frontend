import axios from 'axios';
export const BASE_ADDRESS = 'https://web.yplbd.com/ro';
export const BASE_URL = 'https://web.yplbd.com/ro/api/v1';

const client = axios.create({
  baseURL: BASE_URL,
});

export default client;

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
