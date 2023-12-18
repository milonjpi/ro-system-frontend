import { api } from '../../api/apiSlice';

const PAYMENT_METHOD_URL = '/payment-method';

const paymentMethodApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getPaymentMethods: build.query({
      query: (params) => ({
        url: PAYMENT_METHOD_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          paymentMethods: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['payment-method'],
    }),

    // get single
    getSinglePaymentMethod: build.query({
      query: (id) => ({
        url: `${PAYMENT_METHOD_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['payment-method'],
    }),

    // create
    createPaymentMethod: build.mutation({
      query: (data) => ({
        url: `${PAYMENT_METHOD_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['payment-method'],
    }),

    // update
    updatePaymentMethod: build.mutation({
      query: (data) => ({
        url: `${PAYMENT_METHOD_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['payment-method'],
    }),

    // delete
    deletePaymentMethod: build.mutation({
      query: (id) => ({
        url: `${PAYMENT_METHOD_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['payment-method'],
    }),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useGetSinglePaymentMethodQuery,
  useCreatePaymentMethodMutation,
  useUpdatePaymentMethodMutation,
  useDeletePaymentMethodMutation,
} = paymentMethodApi;
