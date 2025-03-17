import { api } from '../../api/apiSlice';

const EXPENSE_AREA_URL = '/expense-area';

const expenseAreaApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getExpenseAreas: build.query({
      query: (params) => ({
        url: EXPENSE_AREA_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          expenseAreas: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['expenseArea'],
    }),

    // get single
    getSingleExpenseArea: build.query({
      query: (id) => ({
        url: `${EXPENSE_AREA_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['expenseArea'],
    }),

    // create
    createExpenseArea: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_AREA_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['expenseArea'],
    }),

    // update
    updateExpenseArea: build.mutation({
      query: (data) => ({
        url: `${EXPENSE_AREA_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['expenseArea'],
    }),
  }),
});

export const {
  useGetExpenseAreasQuery,
  useGetSingleExpenseAreaQuery,
  useCreateExpenseAreaMutation,
  useUpdateExpenseAreaMutation,
} = expenseAreaApi;
