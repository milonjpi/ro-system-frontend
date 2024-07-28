import { api } from '../../api/apiSlice';

const DR_CUSTOMER_URL = '/dr-customer';

const drCustomerApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getDrCustomers: build.query({
      query: (params) => ({
        url: DR_CUSTOMER_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          customers: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['drCustomer', 'drInvoice'],
    }),

    // get single
    getSingleDrCustomer: build.query({
      query: (id) => ({
        url: `${DR_CUSTOMER_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['drCustomer'],
    }),

    // create
    createDrCustomer: build.mutation({
      query: (data) => ({
        url: `${DR_CUSTOMER_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['drCustomer'],
    }),

    // update
    updateDrCustomer: build.mutation({
      query: (data) => ({
        url: `${DR_CUSTOMER_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['drCustomer'],
    }),

    // delete
    deleteDrCustomer: build.mutation({
      query: (id) => ({
        url: `${DR_CUSTOMER_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['drCustomer'],
    }),

    // customer details
    customerDetails: build.query({
      query: (params) => ({
        url: `${DR_CUSTOMER_URL}/customer-details`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          customers: response?.data,
        };
      },
      providesTags: ['drCustomer', 'drVoucher', 'drInvoice'],
    }),
  }),
});

export const {
  useGetDrCustomersQuery,
  useGetSingleDrCustomerQuery,
  useCreateDrCustomerMutation,
  useUpdateDrCustomerMutation,
  useDeleteDrCustomerMutation,
} = drCustomerApi;
