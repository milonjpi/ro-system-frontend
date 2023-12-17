import { createApi } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from 'api/client';
import { axiosBaseQuery } from 'helper/axios/axiosBaseQuery';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: axiosBaseQuery({
    baseUrl: BASE_URL,
  }),
  tagTypes: [
    'auth',
    'customer',
    'customer-group',
    'product',
    'uom',
    'sales-order',
  ],
  endpoints: () => ({}),
});
