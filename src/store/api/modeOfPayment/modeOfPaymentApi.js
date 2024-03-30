import { api } from '../../api/apiSlice';

const MODE_OF_PAYMENT_URL = '/mode-of-payment';

const modeOfPaymentApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getModeOfPayments: build.query({
      query: (params) => ({
        url: MODE_OF_PAYMENT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          modeOfPayments: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['mode-of-payment'],
    }),

    // get single
    getSingleModeOfPayment: build.query({
      query: (id) => ({
        url: `${MODE_OF_PAYMENT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['mode-of-payment'],
    }),

    // create
    createModeOfPayment: build.mutation({
      query: (data) => ({
        url: `${MODE_OF_PAYMENT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['mode-of-payment'],
    }),

    // update
    updateModeOfPayment: build.mutation({
      query: (data) => ({
        url: `${MODE_OF_PAYMENT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['mode-of-payment'],
    }),

    // delete
    deleteModeOfPayment: build.mutation({
      query: (id) => ({
        url: `${MODE_OF_PAYMENT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['mode-of-payment'],
    }),
  }),
});

export const {
  useGetModeOfPaymentsQuery,
  useGetSingleModeOfPaymentQuery,
  useCreateModeOfPaymentMutation,
  useUpdateModeOfPaymentMutation,
  useDeleteModeOfPaymentMutation,
} = modeOfPaymentApi;
