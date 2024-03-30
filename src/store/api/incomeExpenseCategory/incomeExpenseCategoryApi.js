import { api } from '../../api/apiSlice';

const INCOME_EXPENSE_CATEGORY_URL = '/income-expense-category';

const incomeExpenseCategoryApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getIncomeExpenseCategories: build.query({
      query: (params) => ({
        url: INCOME_EXPENSE_CATEGORY_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          incomeExpenseCategories: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['income-expense-category'],
    }),

    // get single
    getSingleIncomeExpenseCategory: build.query({
      query: (id) => ({
        url: `${INCOME_EXPENSE_CATEGORY_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['income-expense-category'],
    }),

    // create
    createIncomeExpenseCategory: build.mutation({
      query: (data) => ({
        url: `${INCOME_EXPENSE_CATEGORY_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['income-expense-category'],
    }),

    // update
    updateIncomeExpenseCategory: build.mutation({
      query: (data) => ({
        url: `${INCOME_EXPENSE_CATEGORY_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['income-expense-category'],
    }),

    // delete
    deleteIncomeExpenseCategory: build.mutation({
      query: (id) => ({
        url: `${INCOME_EXPENSE_CATEGORY_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['income-expense-category'],
    }),
  }),
});

export const {
  useGetIncomeExpenseCategoriesQuery,
  useGetSingleIncomeExpenseCategoryQuery,
  useCreateIncomeExpenseCategoryMutation,
  useUpdateIncomeExpenseCategoryMutation,
  useDeleteIncomeExpenseCategoryMutation,
} = incomeExpenseCategoryApi;
