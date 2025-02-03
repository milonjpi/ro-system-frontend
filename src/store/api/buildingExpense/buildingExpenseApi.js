import { api } from '../../api/apiSlice';

const BUILDING_EXPENSE_URL = '/building-expense';

const buildingExpenseApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getBuildingExpenses: build.query({
      query: (params) => ({
        url: BUILDING_EXPENSE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          buildingExpenses: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['buildingExpense'],
    }),

    // get single
    getSingleBuildingExpense: build.query({
      query: (id) => ({
        url: `${BUILDING_EXPENSE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['buildingExpense'],
    }),

    // create
    createBuildingExpense: build.mutation({
      query: (data) => ({
        url: `${BUILDING_EXPENSE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['buildingExpense'],
    }),

    // update
    updateBuildingExpense: build.mutation({
      query: (data) => ({
        url: `${BUILDING_EXPENSE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['buildingExpense'],
    }),

    // delete
    deleteBuildingExpense: build.mutation({
      query: (id) => ({
        url: `${BUILDING_EXPENSE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['buildingExpense'],
    }),
  }),
});

export const {
  useGetBuildingExpensesQuery,
  useGetSingleBuildingExpenseQuery,
  useCreateBuildingExpenseMutation,
  useUpdateBuildingExpenseMutation,
  useDeleteBuildingExpenseMutation,
} = buildingExpenseApi;
