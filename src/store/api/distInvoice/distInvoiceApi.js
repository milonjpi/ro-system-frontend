import { api } from '../../api/apiSlice';

const DIST_INVOICE_URL = '/dist-invoice';

const distInvoiceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getDistInvoices: build.query({
      query: (params) => ({
        url: DIST_INVOICE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          distInvoices: response?.data?.data,
          sum: response?.data?.sum,
          meta: response?.meta,
        };
      },
      providesTags: ['distInvoice'],
    }),

    // get single
    getSingleDistInvoice: build.query({
      query: (id) => ({
        url: `${DIST_INVOICE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['distInvoice'],
    }),

    // create
    createDistInvoice: build.mutation({
      query: (data) => ({
        url: `${DIST_INVOICE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['distInvoice'],
    }),

    // update
    updateDistInvoice: build.mutation({
      query: (data) => ({
        url: `${DIST_INVOICE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['distInvoice'],
    }),

    // delete
    deleteDistInvoice: build.mutation({
      query: (id) => ({
        url: `${DIST_INVOICE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['distInvoice'],
    }),
  }),
});

export const {
  useGetDistInvoicesQuery,
  useGetSingleDistInvoiceQuery,
  useCreateDistInvoiceMutation,
  useUpdateDistInvoiceMutation,
  useDeleteDistInvoiceMutation,
} = distInvoiceApi;
