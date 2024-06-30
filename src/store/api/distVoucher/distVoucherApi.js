import { api } from '../../api/apiSlice';

const DIST_VOUCHER_URL = '/dist-voucher';

const distVoucherApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getDistVouchers: build.query({
      query: (params) => ({
        url: DIST_VOUCHER_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          distVouchers: response?.data?.data,
          sum: response?.data?.sum,
          meta: response?.meta,
        };
      },
      providesTags: ['distVoucher'],
    }),

    // get single
    getSingleDistVoucher: build.query({
      query: (id) => ({
        url: `${DIST_VOUCHER_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['distVoucher'],
    }),

    // receive payment
    distReceivePayment: build.mutation({
      query: (data) => ({
        url: `${DIST_VOUCHER_URL}/receive-payment`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['distVoucher', 'distClient'],
    }),

    // update receive payment
    updateDistReceivePayment: build.mutation({
      query: (data) => ({
        url: `${DIST_VOUCHER_URL}/receive-payment/${data?.id}`,
        method: 'PATCH',
        data: data.body,
      }),
      invalidatesTags: ['distVoucher', 'distClient'],
    }),

    // delete receive payment
    deleteDistReceivePayment: build.mutation({
      query: (id) => ({
        url: `${DIST_VOUCHER_URL}/receive-payment/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['distVoucher', 'distClient'],
    }),
  }),
});

export const {
  useGetDistVouchersQuery,
  useGetSingleDistVoucherQuery,
  useDistReceivePaymentMutation,
  useUpdateDistReceivePaymentMutation,
  useDeleteDistReceivePaymentMutation,
} = distVoucherApi;
