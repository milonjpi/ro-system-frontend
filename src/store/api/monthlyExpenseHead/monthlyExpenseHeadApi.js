import { api } from '../../api/apiSlice';

const MONTHLY_EXPENSE_HEAD_URL = '/monthly-expense-head';

const monthlyExpenseHeadApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all parties
    getAllMonthlyExpenseHeads: build.query({
      query: (params) => ({
        url: MONTHLY_EXPENSE_HEAD_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          monthlyExpenseHeads: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['monthlyExpenseHead'],
    }),

    // get single monthlyExpenseHead
    getSingleMonthlyExpenseHead: build.query({
      query: (id) => ({
        url: `${MONTHLY_EXPENSE_HEAD_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['monthlyExpenseHead'],
    }),

    // add monthlyExpenseHead
    createMonthlyExpenseHead: build.mutation({
      query: (data) => ({
        url: `${MONTHLY_EXPENSE_HEAD_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['monthlyExpenseHead'],
    }),

    // update monthlyExpenseHead
    updateMonthlyExpenseHead: build.mutation({
      query: (data) => ({
        url: `${MONTHLY_EXPENSE_HEAD_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['monthlyExpenseHead'],
    }),
    // delete
    deleteMonthlyExpenseHead: build.mutation({
      query: (id) => ({
        url: `${MONTHLY_EXPENSE_HEAD_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['monthlyExpenseHead'],
    }),
  }),
});

export const {
  useGetAllMonthlyExpenseHeadsQuery,
  useGetSingleMonthlyExpenseHeadQuery,
  useCreateMonthlyExpenseHeadMutation,
  useUpdateMonthlyExpenseHeadMutation,
  useDeleteMonthlyExpenseHeadMutation,
} = monthlyExpenseHeadApi;
