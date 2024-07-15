import { api } from '../../api/apiSlice';

const FOS_INVOICE_URL = '/fos-invoice';

const fosInvoiceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getFosInvoices: build.query({
      query: (params) => ({
        url: FOS_INVOICE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          fosInvoices: response?.data?.data,
          sum: response?.data?.sum,
          meta: response?.meta,
        };
      },
      providesTags: ['fosInvoice'],
    }),

    // summary
    getFosSummary: build.query({
      query: (params) => ({
        url: `${FOS_INVOICE_URL}/summary`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['fosInvoice'],
    }),

    // get single
    getSingleFosInvoice: build.query({
      query: (id) => ({
        url: `${FOS_INVOICE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['fosInvoice'],
    }),

    // create
    createFosInvoice: build.mutation({
      query: (data) => ({
        url: `${FOS_INVOICE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['fosInvoice'],
    }),

    // update
    updateFosInvoice: build.mutation({
      query: (data) => ({
        url: `${FOS_INVOICE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['fosInvoice'],
    }),

    // delete
    deleteFosInvoice: build.mutation({
      query: (id) => ({
        url: `${FOS_INVOICE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['fosInvoice'],
    }),
  }),
});

export const {
  useGetFosInvoicesQuery,
  useGetFosSummaryQuery,
  useGetSingleFosInvoiceQuery,
  useCreateFosInvoiceMutation,
  useUpdateFosInvoiceMutation,
  useDeleteFosInvoiceMutation,
} = fosInvoiceApi;
