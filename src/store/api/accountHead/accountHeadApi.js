import { api } from '../../api/apiSlice';

const ACCOUNT_HEAD_URL = '/account-head';

const accountHeadApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getAccountHeads: build.query({
      query: (params) => ({
        url: ACCOUNT_HEAD_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          accountHeads: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['account-head'],
    }),

    // get single
    getSingleAccountHead: build.query({
      query: (id) => ({
        url: `${ACCOUNT_HEAD_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['account-head'],
    }),

    // create
    createAccountHead: build.mutation({
      query: (data) => ({
        url: `${ACCOUNT_HEAD_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['account-head'],
    }),

    // update
    updateAccountHead: build.mutation({
      query: (data) => ({
        url: `${ACCOUNT_HEAD_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['account-head'],
    }),

    // delete
    deleteAccountHead: build.mutation({
      query: (id) => ({
        url: `${ACCOUNT_HEAD_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['account-head'],
    }),
  }),
});

export const {
  useGetAccountHeadsQuery,
  useGetSingleAccountHeadQuery,
  useCreateAccountHeadMutation,
  useUpdateAccountHeadMutation,
  useDeleteAccountHeadMutation,
} = accountHeadApi;
