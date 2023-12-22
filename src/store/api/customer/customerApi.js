import { api } from '../../api/apiSlice';

const CUSTOMER_URL = '/customer';

const customerApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getCustomers: build.query({
      query: (params) => ({
        url: CUSTOMER_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          customers: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['customer', 'voucher'],
    }),

    // get single
    getSingleCustomer: build.query({
      query: (id) => ({
        url: `${CUSTOMER_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['customer'],
    }),

    // create
    createCustomer: build.mutation({
      query: (data) => ({
        url: `${CUSTOMER_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['customer'],
    }),
    // create
    createAllCustomer: build.mutation({
      query: (data) => ({
        url: `${CUSTOMER_URL}/create/all`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['customer'],
    }),

    // update
    updateCustomer: build.mutation({
      query: (data) => ({
        url: `${CUSTOMER_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['customer'],
    }),

    // delete
    deleteCustomer: build.mutation({
      query: (id) => ({
        url: `${CUSTOMER_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['customer'],
    }),
  }),
});

export const {
  useGetCustomersQuery,
  useGetSingleCustomerQuery,
  useCreateCustomerMutation,
  useCreateAllCustomerMutation,
  useUpdateCustomerMutation,
  useDeleteCustomerMutation,
} = customerApi;
