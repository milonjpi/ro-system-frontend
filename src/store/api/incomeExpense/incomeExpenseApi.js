import { api } from '../../api/apiSlice';

const EXPENSE_URL = '/income-expense';

const incomeExpenseApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getIncomeExpenses: build.query({
      query: (params) => ({
        url: EXPENSE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          incomeExpenses: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['income-expense'],
    }),

    // get single
    getSingleIncomeExpense: build.query({
      query: (id) => ({
        url: `${EXPENSE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['income-expense'],
    }),

    // create
    createIncomeExpense: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['income-expense'],
    }),

    // update
    updateIncomeExpense: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['income-expense'],
    }),

    // delete
    deleteIncomeExpense: build.mutation({
      query: (id) => ({
        url: `${EXPENSE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['income-expense'],
    }),
  }),
});

export const {
  useGetIncomeExpensesQuery,
  useGetSingleIncomeExpenseQuery,
  useCreateIncomeExpenseMutation,
  useUpdateIncomeExpenseMutation,
  useDeleteIncomeExpenseMutation,
} = incomeExpenseApi;
