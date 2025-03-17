import { api } from '../../api/apiSlice';

const MONTHLY_EXPENSE_URL = '/monthly-expense';

const monthlyExpenseApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getMonthlyExpenses: build.query({
      query: (params) => ({
        url: MONTHLY_EXPENSE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          monthlyExpenses: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['monthlyExpense'],
    }),

    // get single
    getSingleMonthlyExpense: build.query({
      query: (id) => ({
        url: `${MONTHLY_EXPENSE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['monthlyExpense'],
    }),

    // create
    createMonthlyExpense: build.mutation({
      query: (data) => ({
        url: `${MONTHLY_EXPENSE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['monthlyExpense'],
    }),

    // update
    updateMonthlyExpense: build.mutation({
      query: (data) => ({
        url: `${MONTHLY_EXPENSE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['monthlyExpense'],
    }),

    // delete
    deleteMonthlyExpense: build.mutation({
      query: (id) => ({
        url: `${MONTHLY_EXPENSE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['monthlyExpense'],
    }),
  }),
});

export const {
  useGetMonthlyExpensesQuery,
  useGetSingleMonthlyExpenseQuery,
  useCreateMonthlyExpenseMutation,
  useUpdateMonthlyExpenseMutation,
  useDeleteMonthlyExpenseMutation,
} = monthlyExpenseApi;
