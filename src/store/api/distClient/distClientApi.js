import { api } from '../../api/apiSlice';

const DIST_CLIENT_URL = '/dist-client';

const distClientApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getDistClients: build.query({
      query: (params) => ({
        url: DIST_CLIENT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          distClients: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['distClient', 'distVoucher', 'distInvoice'],
    }),

    // get single
    getSingleDistClient: build.query({
      query: (id) => ({
        url: `${DIST_CLIENT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['distClient'],
    }),

    // create
    createDistClient: build.mutation({
      query: (data) => ({
        url: `${DIST_CLIENT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['distClient'],
    }),
    // create
    createAllDistClient: build.mutation({
      query: (data) => ({
        url: `${DIST_CLIENT_URL}/create/all`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['distClient'],
    }),

    // update
    updateDistClient: build.mutation({
      query: (data) => ({
        url: `${DIST_CLIENT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['distClient'],
    }),

    // delete
    deleteDistClient: build.mutation({
      query: (id) => ({
        url: `${DIST_CLIENT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['distClient'],
    }),

    // distClient details
    distClientDetails: build.query({
      query: (params) => ({
        url: `${DIST_CLIENT_URL}/customer-details`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          distClients: response?.data,
        };
      },
      providesTags: ['distClient', 'distVoucher', 'distInvoice'],
    }),
  }),
});

export const {
  useGetDistClientsQuery,
  useGetSingleDistClientQuery,
  useCreateDistClientMutation,
  useCreateAllDistClientMutation,
  useUpdateDistClientMutation,
  useDeleteDistClientMutation,
  useDistClientDetailsQuery,
} = distClientApi;
