import { api } from '../../api/apiSlice';

const EXPENSE_DETAIL_URL = '/expense-detail';

const expenseDetailApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getExpenseDetails: build.query({
      query: (params) => ({
        url: EXPENSE_DETAIL_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          expenseDetails: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['expenseDetail'],
    }),

    // get single
    getSingleExpenseDetail: build.query({
      query: (id) => ({
        url: `${EXPENSE_DETAIL_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['expenseDetail'],
    }),

    // create
    createExpenseDetail: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_DETAIL_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['expenseDetail'],
    }),

    // update
    updateExpenseDetail: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_DETAIL_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['expenseDetail'],
    }),
    // delete
    deleteExpenseDetail: build.mutation({
      query: (id) => ({
        url: `${EXPENSE_DETAIL_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['expenseDetail'],
    }),
  }),
});

export const {
  useGetExpenseDetailsQuery,
  useGetSingleExpenseDetailQuery,
  useCreateExpenseDetailMutation,
  useUpdateExpenseDetailMutation,
  useDeleteExpenseDetailMutation,
} = expenseDetailApi;
