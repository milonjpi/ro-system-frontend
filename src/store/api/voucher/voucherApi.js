import { api } from '../../api/apiSlice';

const VOUCHER_URL = '/voucher';

const voucherApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getVouchers: build.query({
      query: (params) => ({
        url: VOUCHER_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          vouchers: response?.data?.data,
          sum: response?.data?.sum,
          meta: response?.meta,
        };
      },
      providesTags: ['voucher'],
    }),

    // get single
    getSingleVoucher: build.query({
      query: (id) => ({
        url: `${VOUCHER_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['voucher'],
    }),

    // receive payment
    receivePayment: build.mutation({
      query: (data) => ({
        url: `${VOUCHER_URL}/receive-payment`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['voucher', 'customer', 'invoice'],
    }),

    // update receive payment
    updateReceivePayment: build.mutation({
      query: (data) => ({
        url: `${VOUCHER_URL}/receive-payment/${data?.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      invalidatesTags: ['voucher', 'customer', 'invoice'],
    }),

    // delete receive payment
    deleteReceivePayment: build.mutation({
      query: (id) => ({
        url: `${VOUCHER_URL}/receive-payment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['voucher', 'customer', 'invoice'],
    }),

    // make payment
    makePayment: build.mutation({
      query: (data) => ({
        url: `${VOUCHER_URL}/make-payment`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['voucher', 'customer', 'invoice'],
    }),
  }),
});

export const {
  useGetVouchersQuery,
  useGetSingleVoucherQuery,
  useReceivePaymentMutation,
  useUpdateReceivePaymentMutation,
  useDeleteReceivePaymentMutation,
  useMakePaymentMutation,
} = voucherApi;
