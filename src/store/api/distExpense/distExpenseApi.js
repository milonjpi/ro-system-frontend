import { api } from '../../api/apiSlice';

const DIST_EXPENSE_URL = '/dist-expense';

const distExpenseApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getDistExpenses: build.query({
      query: (params) => ({
        url: DIST_EXPENSE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          distExpenses: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['distExpense'],
    }),

    // get single
    getSingleDistExpense: build.query({
      query: (id) => ({
        url: `${DIST_EXPENSE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['distExpense'],
    }),

    // create
    createDistExpense: build.mutation({
      query: (data) => ({
        url: `${DIST_EXPENSE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['distExpense'],
    }),

    // update
    updateDistExpense: build.mutation({
      query: (data) => ({
        url: `${DIST_EXPENSE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['distExpense'],
    }),

    // delete
    deleteDistExpense: build.mutation({
      query: (id) => ({
        url: `${DIST_EXPENSE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['distExpense'],
    }),
  }),
});

export const {
  useGetDistExpensesQuery,
  useGetSingleDistExpenseQuery,
  useCreateDistExpenseMutation,
  useUpdateDistExpenseMutation,
  useDeleteDistExpenseMutation,
} = distExpenseApi;
