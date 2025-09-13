import { api } from '../../api/apiSlice';

const EXPENSE_SUB_HEAD_URL = '/expense-sub-head';

const expenseSubHeadApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getExpenseSubHeads: build.query({
      query: (params) => ({
        url: EXPENSE_SUB_HEAD_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          expenseSubHeads: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['expense-sub-head'],
    }),

    // get single
    getSingleExpenseSubHead: build.query({
      query: (id) => ({
        url: `${EXPENSE_SUB_HEAD_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['expense-sub-head'],
    }),

    // create
    createExpenseSubHead: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_SUB_HEAD_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['expense-sub-head'],
    }),

    // update
    updateExpenseSubHead: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_SUB_HEAD_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['expense-sub-head'],
    }),

    // delete
    deleteExpenseSubHead: build.mutation({
      query: (id) => ({
        url: `${EXPENSE_SUB_HEAD_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['expense-sub-head'],
    }),
  }),
});

export const {
  useGetExpenseSubHeadsQuery,
  useGetSingleExpenseSubHeadQuery,
  useCreateExpenseSubHeadMutation,
  useUpdateExpenseSubHeadMutation,
  useDeleteExpenseSubHeadMutation,
} = expenseSubHeadApi;
