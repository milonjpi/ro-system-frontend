import { api } from '../../api/apiSlice';

const EXPENSE_HEAD_URL = '/expense-head';

const expenseHeadApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getExpenseHeads: build.query({
      query: (params) => ({
        url: EXPENSE_HEAD_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          expenseHeads: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['expense-head'],
    }),

    // get single
    getSingleExpenseHead: build.query({
      query: (id) => ({
        url: `${EXPENSE_HEAD_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['expense-head'],
    }),

    // create
    createExpenseHead: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_HEAD_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['expense-head'],
    }),

    // update
    updateExpenseHead: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_HEAD_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['expense-head'],
    }),

    // delete
    deleteExpenseHead: build.mutation({
      query: (id) => ({
        url: `${EXPENSE_HEAD_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['expense-head'],
    }),
  }),
});

export const {
  useGetExpenseHeadsQuery,
  useGetSingleExpenseHeadQuery,
  useCreateExpenseHeadMutation,
  useUpdateExpenseHeadMutation,
  useDeleteExpenseHeadMutation,
} = expenseHeadApi;
