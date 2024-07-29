import { api } from '../../api/apiSlice';

const DR_INVOICE_URL = '/dr-invoice';

const drInvoiceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getDrInvoices: build.query({
      query: (params) => ({
        url: DR_INVOICE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          invoices: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['drInvoice'],
    }),

    // get single
    getSingleDrInvoice: build.query({
      query: (id) => ({
        url: `${DR_INVOICE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['drInvoice'],
    }),

    // create
    createDrInvoice: build.mutation({
      query: (data) => ({
        url: `${DR_INVOICE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['drInvoice'],
    }),

    // update
    updateDrInvoice: build.mutation({
      query: (data) => ({
        url: `${DR_INVOICE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['drInvoice'],
    }),

    // delete
    deleteDrInvoice: build.mutation({
      query: (id) => ({
        url: `${DR_INVOICE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['drInvoice'],
    }),
  }),
});

export const {
  useGetDrInvoicesQuery,
  useGetSingleDrInvoiceQuery,
  useCreateDrInvoiceMutation,
  useUpdateDrInvoiceMutation,
  useDeleteDrInvoiceMutation,
} = drInvoiceApi;
