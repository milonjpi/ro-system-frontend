import { api } from '../../api/apiSlice';

const WITHDRAW_URL = '/withdraw';

const withdrawApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getWithdraws: build.query({
      query: (params) => ({
        url: WITHDRAW_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          withdraws: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['withdraw'],
    }),

    // get single
    getSingleWithdraw: build.query({
      query: (id) => ({
        url: `${WITHDRAW_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['withdraw'],
    }),

    // create
    createWithdraw: build.mutation({
      query: (data) => ({
        url: `${WITHDRAW_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['withdraw'],
    }),

    // update
    updateWithdraw: build.mutation({
      query: (data) => ({
        url: `${WITHDRAW_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['withdraw'],
    }),

    // delete
    deleteWithdraw: build.mutation({
      query: (id) => ({
        url: `${WITHDRAW_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['withdraw'],
    }),
  }),
});

export const {
  useGetWithdrawsQuery,
  useGetSingleWithdrawQuery,
  useCreateWithdrawMutation,
  useUpdateWithdrawMutation,
  useDeleteWithdrawMutation,
} = withdrawApi;
