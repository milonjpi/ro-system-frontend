import { api } from '../../api/apiSlice';

const BUILDING_EXPENSE_HEAD_URL = '/building-expense-head';

const buildingExpenseHeadApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getBuildingExpenseHeads: build.query({
      query: (params) => ({
        url: BUILDING_EXPENSE_HEAD_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          buildingExpenseHeads: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['buildingExpenseHead'],
    }),

    // get single
    getSingleBuildingExpenseHead: build.query({
      query: (id) => ({
        url: `${BUILDING_EXPENSE_HEAD_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['buildingExpenseHead'],
    }),

    // create
    createBuildingExpenseHead: build.mutation({
      query: (data) => ({
        url: `${BUILDING_EXPENSE_HEAD_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['buildingExpenseHead'],
    }),

    // update
    updateBuildingExpenseHead: build.mutation({
      query: (data) => ({
        url: `${BUILDING_EXPENSE_HEAD_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['buildingExpenseHead'],
    }),

    // delete
    deleteBuildingExpenseHead: build.mutation({
      query: (id) => ({
        url: `${BUILDING_EXPENSE_HEAD_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['buildingExpenseHead'],
    }),
  }),
});

export const {
  useGetBuildingExpenseHeadsQuery,
  useGetSingleBuildingExpenseHeadQuery,
  useCreateBuildingExpenseHeadMutation,
  useUpdateBuildingExpenseHeadMutation,
  useDeleteBuildingExpenseHeadMutation,
} = buildingExpenseHeadApi;
