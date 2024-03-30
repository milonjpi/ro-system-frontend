import { api } from '../../api/apiSlice';

const INCOME_EXPENSE_HEAD_URL = '/income-expense-head';

const incomeExpenseHeadApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getIncomeExpenseHeads: build.query({
      query: (params) => ({
        url: INCOME_EXPENSE_HEAD_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          incomeExpenseHeads: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['income-expense-head'],
    }),

    // get single
    getSingleIncomeExpenseHead: build.query({
      query: (id) => ({
        url: `${INCOME_EXPENSE_HEAD_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['income-expense-head'],
    }),

    // create
    createIncomeExpenseHead: build.mutation({
      query: (data) => ({
        url: `${INCOME_EXPENSE_HEAD_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['income-expense-head'],
    }),

    // update
    updateIncomeExpenseHead: build.mutation({
      query: (data) => ({
        url: `${INCOME_EXPENSE_HEAD_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['income-expense-head'],
    }),

    // delete
    deleteIncomeExpenseHead: build.mutation({
      query: (id) => ({
        url: `${INCOME_EXPENSE_HEAD_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['income-expense-head'],
    }),
  }),
});

export const {
  useGetIncomeExpenseHeadsQuery,
  useGetSingleIncomeExpenseHeadQuery,
  useCreateIncomeExpenseHeadMutation,
  useUpdateIncomeExpenseHeadMutation,
  useDeleteIncomeExpenseHeadMutation,
} = incomeExpenseHeadApi;
