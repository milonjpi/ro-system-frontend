import { api } from '../../api/apiSlice';

const EXPENSE_URL = '/expense';

const expenseApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getExpenses: build.query({
      query: (params) => ({
        url: EXPENSE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          expenses: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['expense'],
    }),

    // get single
    getSingleExpense: build.query({
      query: (id) => ({
        url: `${EXPENSE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['expense'],
    }),

    // create
    createExpense: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['expense'],
    }),

    // update
    updateExpense: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['expense'],
    }),

    // delete
    deleteExpense: build.mutation({
      query: (id) => ({
        url: `${EXPENSE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['expense'],
    }),
  }),
});

export const {
  useGetExpensesQuery,
  useGetSingleExpenseQuery,
  useCreateExpenseMutation,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
} = expenseApi;
