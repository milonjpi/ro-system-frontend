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
    'bill',
    'customer',
    'vendor',
    'customer-group',
    'product',
    'uom',
    'sales-order',
    'account-type',
    'account-head',
    'payment-method',
    'invoice',
    'voucher',
    'equipment',
    'equipmentIn',
    'equipmentOut',
    'expense-head',
    'expense',
    'asset',
    'fixed-asset',
    'investment',
    'withdraw',
    'income-expense-category',
    'income-expense-head',
    'mode-of-payment',
    'income-expense',
  ],
  endpoints: () => ({}),
});
