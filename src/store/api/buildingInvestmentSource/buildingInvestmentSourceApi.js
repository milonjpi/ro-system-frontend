import { api } from '../../api/apiSlice';

const BUILDING_INVESTMENT_SOURCE_URL = '/building-investment-source';

const buildingInvestmentSourceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getBuildingInvestmentSources: build.query({
      query: (params) => ({
        url: BUILDING_INVESTMENT_SOURCE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          buildingInvestmentSources: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['buildingInvestmentSource'],
    }),

    // get single
    getSingleBuildingInvestmentSource: build.query({
      query: (id) => ({
        url: `${BUILDING_INVESTMENT_SOURCE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['buildingInvestmentSource'],
    }),

    // create
    createBuildingInvestmentSource: build.mutation({
      query: (data) => ({
        url: `${BUILDING_INVESTMENT_SOURCE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['buildingInvestmentSource'],
    }),

    // update
    updateBuildingInvestmentSource: build.mutation({
      query: (data) => ({
        url: `${BUILDING_INVESTMENT_SOURCE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['buildingInvestmentSource'],
    }),

    // delete
    deleteBuildingInvestmentSource: build.mutation({
      query: (id) => ({
        url: `${BUILDING_INVESTMENT_SOURCE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['buildingInvestmentSource'],
    }),
  }),
});

export const {
  useGetBuildingInvestmentSourcesQuery,
  useGetSingleBuildingInvestmentSourceQuery,
  useCreateBuildingInvestmentSourceMutation,
  useUpdateBuildingInvestmentSourceMutation,
  useDeleteBuildingInvestmentSourceMutation,
} = buildingInvestmentSourceApi;
