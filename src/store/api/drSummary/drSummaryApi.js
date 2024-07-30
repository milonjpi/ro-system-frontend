import { api } from '../../api/apiSlice';

const DR_SUMMARY_URL = '/dr-summary';

const drSummaryApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get summary
    getDrSummary: build.query({
      query: (params) => ({
        url: DR_SUMMARY_URL,
        method: 'GET',
        params: params,
      }),
      providesTags: ['drCustomer', 'drProduct', 'drInvoice', 'drVoucher'],
    }),
  }),
});

export const { useGetDrSummaryQuery } = drSummaryApi;
