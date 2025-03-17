import { api } from '../../api/apiSlice';

const PAYMENT_SOURCE_URL = '/expense-area';

const paymentSourceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getPaymentSources: build.query({
      query: (params) => ({
        url: PAYMENT_SOURCE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          paymentSources: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['paymentSource'],
    }),

    // get single
    getSinglePaymentSource: build.query({
      query: (id) => ({
        url: `${PAYMENT_SOURCE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['paymentSource'],
    }),

    // create
    createPaymentSource: build.mutation({
      query: (data) => ({
        url: `${PAYMENT_SOURCE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['paymentSource'],
    }),

    // update
    updatePaymentSource: build.mutation({
      query: (data) => ({
        url: `${PAYMENT_SOURCE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['paymentSource'],
    }),
  }),
});

export const {
  useGetPaymentSourcesQuery,
  useGetSinglePaymentSourceQuery,
  useCreatePaymentSourceMutation,
  useUpdatePaymentSourceMutation,
} = paymentSourceApi;
