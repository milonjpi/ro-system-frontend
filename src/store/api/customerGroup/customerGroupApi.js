import { api } from '../../api/apiSlice';

const CUSTOMER_GROUP_URL = '/customer-group';

const customerApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getCustomerGroups: build.query({
      query: (params) => ({
        url: CUSTOMER_GROUP_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          customerGroups: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['customer-group'],
    }),

    // get single
    getSingleCustomerGroup: build.query({
      query: (id) => ({
        url: `${CUSTOMER_GROUP_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['customer-group'],
    }),

    // create
    createCustomerGroup: build.mutation({
      query: (data) => ({
        url: `${CUSTOMER_GROUP_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['customer-group'],
    }),

    // update
    updateCustomerGroup: build.mutation({
      query: (data) => ({
        url: `${CUSTOMER_GROUP_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['customer-group'],
    }),

    // delete
    deleteCustomerGroup: build.mutation({
      query: (id) => ({
        url: `${CUSTOMER_GROUP_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['customer-group'],
    }),
  }),
});

export const {
  useGetCustomerGroupsQuery,
  useGetSingleCustomerGroupQuery,
  useCreateCustomerGroupMutation,
  useUpdateCustomerGroupMutation,
  useDeleteCustomerGroupMutation,
} = customerApi;
