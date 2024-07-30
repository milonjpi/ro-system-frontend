import { api } from '../../api/apiSlice';

const DR_VOUCHER_URL = '/dr-voucher';

const drVoucherApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getDrVouchers: build.query({
      query: (params) => ({
        url: DR_VOUCHER_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          vouchers: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['drVoucher'],
    }),

    // create
    createDrVoucher: build.mutation({
      query: (data) => ({
        url: `${DR_VOUCHER_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['drVoucher', 'drCustomer', 'drInvoice'],
    }),

    // update
    updateDrVoucher: build.mutation({
      query: (data) => ({
        url: `${DR_VOUCHER_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['drVoucher', 'drCustomer', 'drInvoice'],
    }),

    // delete
    deleteDrVoucher: build.mutation({
      query: (id) => ({
        url: `${DR_VOUCHER_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['drVoucher', 'drCustomer', 'drInvoice'],
    }),
  }),
});

export const {
  useGetDrVouchersQuery,
  useCreateDrVoucherMutation,
  useUpdateDrVoucherMutation,
  useDeleteDrVoucherMutation,
} = drVoucherApi;
