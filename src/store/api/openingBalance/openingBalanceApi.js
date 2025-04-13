import { api } from '../../api/apiSlice';

const OPENING_BALANCE_URL = '/opening-balance';

const openingBalanceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getOpeningBalances: build.query({
      query: (params) => ({
        url: OPENING_BALANCE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          openingBalances: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['openingBalance'],
    }),

    // present balance
    getPresentBalance: build.query({
      query: (params) => ({
        url: `${OPENING_BALANCE_URL}/present-balance`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          presentBalances: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['openingBalance'],
    }),

    // get single
    getSingleOpeningBalance: build.query({
      query: (id) => ({
        url: `${OPENING_BALANCE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['openingBalance'],
    }),

    // create
    createOpeningBalance: build.mutation({
      query: (data) => ({
        url: `${OPENING_BALANCE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['openingBalance'],
    }),

    // update
    updateOpeningBalance: build.mutation({
      query: (data) => ({
        url: `${OPENING_BALANCE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['openingBalance'],
    }),

    // delete
    deleteOpeningBalance: build.mutation({
      query: (id) => ({
        url: `${OPENING_BALANCE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['openingBalance'],
    }),
  }),
});

export const {
  useGetOpeningBalancesQuery,
  useGetPresentBalanceQuery,
  useGetSingleOpeningBalanceQuery,
  useCreateOpeningBalanceMutation,
  useUpdateOpeningBalanceMutation,
  useDeleteOpeningBalanceMutation,
} = openingBalanceApi;
