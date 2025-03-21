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
          monthlyExpenses: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
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
    // get area wise report
    getAreaWiseMonthlyReport: build.query({
      query: (params) => ({
        url: `${MONTHLY_EXPENSE_URL}/area`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['monthlyExpense'],
    }),

    // get area wise dash report
    getAreaWiseDashMonthlyReport: build.query({
      query: (params) => ({
        url: `${MONTHLY_EXPENSE_URL}/area-dash`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['monthlyExpense'],
    }),

    // get head wise report
    getHeadWiseMonthlyReport: build.query({
      query: (params) => ({
        url: `${MONTHLY_EXPENSE_URL}/head`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['monthlyExpense'],
    }),

    // get head wise dash report
    getHeadWiseDashMonthlyReport: build.query({
      query: (params) => ({
        url: `${MONTHLY_EXPENSE_URL}/head-dash`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['monthlyExpense'],
    }),

    // get source wise report
    getSourceWiseMonthlyReport: build.query({
      query: (params) => ({
        url: `${MONTHLY_EXPENSE_URL}/source`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['monthlyExpense'],
    }),
  }),
});

export const {
  useGetMonthlyExpensesQuery,
  useGetSingleMonthlyExpenseQuery,
  useCreateMonthlyExpenseMutation,
  useUpdateMonthlyExpenseMutation,
  useDeleteMonthlyExpenseMutation,
  useGetAreaWiseMonthlyReportQuery,
  useGetAreaWiseDashMonthlyReportQuery,
  useGetHeadWiseMonthlyReportQuery,
  useGetHeadWiseDashMonthlyReportQuery,
  useGetSourceWiseMonthlyReportQuery,
} = monthlyExpenseApi;
