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
          vouchers: response?.data,
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
      invalidatesTags: ['voucher'],
    }),

    // make payment
    makePayment: build.mutation({
      query: (data) => ({
        url: `${VOUCHER_URL}/make-payment`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['voucher'],
    }),
  }),
});

export const {
  useGetVouchersQuery,
  useGetSingleVoucherQuery,
  useReceivePaymentMutation,
  useMakePaymentMutation,
} = voucherApi;
