import { api } from '../../api/apiSlice';

const CUSTOM_INVOICE_URL = '/custom-invoice';

const customInvoiceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get custom invoice
    getCustomInvoices: build.query({
      query: (params) => ({
        url: CUSTOM_INVOICE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          customInvoices: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['invoice', 'customer'],
    }),
  }),
});

export const { useGetCustomInvoicesQuery } = customInvoiceApi;
