import { api } from '../../api/apiSlice';

const FOS_CLIENT_URL = '/fos-customer';

const fosClientApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getFosClients: build.query({
      query: (params) => ({
        url: FOS_CLIENT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          fosClients: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['fosClient', 'fosInvoice'],
    }),

    // get single
    getSingleFosClient: build.query({
      query: (id) => ({
        url: `${FOS_CLIENT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['fosClient'],
    }),

    // create
    createFosClient: build.mutation({
      query: (data) => ({
        url: `${FOS_CLIENT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['fosClient'],
    }),

    // update
    updateFosClient: build.mutation({
      query: (data) => ({
        url: `${FOS_CLIENT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['fosClient'],
    }),

    // delete
    deleteFosClient: build.mutation({
      query: (id) => ({
        url: `${FOS_CLIENT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['fosClient'],
    }),
  }),
});

export const {
  useGetFosClientsQuery,
  useGetSingleFosClientQuery,
  useCreateFosClientMutation,
  useUpdateFosClientMutation,
  useDeleteFosClientMutation,
} = fosClientApi;
