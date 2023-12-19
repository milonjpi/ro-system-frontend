import { api } from '../../api/apiSlice';

const INVOICE_URL = '/invoice';

const invoiceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getInvoices: build.query({
      query: (params) => ({
        url: INVOICE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          invoices: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['invoice'],
    }),

    // get single
    getSingleInvoice: build.query({
      query: (id) => ({
        url: `${INVOICE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['invoice'],
    }),

    // create
    createInvoice: build.mutation({
      query: (data) => ({
        url: `${INVOICE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['invoice'],
    }),

    // update
    updateInvoice: build.mutation({
      query: (data) => ({
        url: `${INVOICE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['invoice'],
    }),

    // delete
    deleteInvoice: build.mutation({
      query: (id) => ({
        url: `${INVOICE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['invoice'],
    }),

    // delete
    cancelInvoice: build.mutation({
      query: (id) => ({
        url: `${INVOICE_URL}/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['invoice'],
    }),
  }),
});

export const {
  useGetInvoicesQuery,
  useGetSingleInvoiceQuery,
  useCreateInvoiceMutation,
  useUpdateInvoiceMutation,
  useDeleteInvoiceMutation,
  useCancelInvoiceMutation,
} = invoiceApi;
