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
          vouchers: response?.data,
          meta: response?.meta,
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
      invalidatesTags: ['drVoucher'],
    }),

    // update
    updateDrVoucher: build.mutation({
      query: (data) => ({
        url: `${DR_VOUCHER_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['drVoucher'],
    }),

    // delete
    deleteDrVoucher: build.mutation({
      query: (id) => ({
        url: `${DR_VOUCHER_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['drVoucher'],
    }),
  }),
});

export const {
  useGetDrVouchersQuery,
  useCreateDrVoucherMutation,
  useUpdateDrVoucherMutation,
  useDeleteDrVoucherMutation,
} = drVoucherApi;
