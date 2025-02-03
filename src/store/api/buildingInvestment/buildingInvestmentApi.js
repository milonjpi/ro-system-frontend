import { api } from '../../api/apiSlice';

const BUILDING_INVESTMENT_URL = '/building-investment';

const buildingInvestmentApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getBuildingInvestments: build.query({
      query: (params) => ({
        url: BUILDING_INVESTMENT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          buildingInvestments: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['buildingInvestment'],
    }),

    // get single
    getSingleBuildingInvestment: build.query({
      query: (id) => ({
        url: `${BUILDING_INVESTMENT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['buildingInvestment'],
    }),

    // create
    createBuildingInvestment: build.mutation({
      query: (data) => ({
        url: `${BUILDING_INVESTMENT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['buildingInvestment'],
    }),

    // update
    updateBuildingInvestment: build.mutation({
      query: (data) => ({
        url: `${BUILDING_INVESTMENT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['buildingInvestment'],
    }),

    // delete
    deleteBuildingInvestment: build.mutation({
      query: (id) => ({
        url: `${BUILDING_INVESTMENT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['buildingInvestment'],
    }),
  }),
});

export const {
  useGetBuildingInvestmentsQuery,
  useGetSingleBuildingInvestmentQuery,
  useCreateBuildingInvestmentMutation,
  useUpdateBuildingInvestmentMutation,
  useDeleteBuildingInvestmentMutation,
} = buildingInvestmentApi;
