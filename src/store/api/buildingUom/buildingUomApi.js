import { api } from '../../api/apiSlice';

const BUILDING_UOM_URL = '/building-uom';

const buildingUomApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getBuildingUom: build.query({
      query: (params) => ({
        url: BUILDING_UOM_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          buildingUom: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['buildingUom'],
    }),

    // get single
    getSingleBuildingUom: build.query({
      query: (id) => ({
        url: `${BUILDING_UOM_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['buildingUom'],
    }),

    // create
    createBuildingUom: build.mutation({
      query: (data) => ({
        url: `${BUILDING_UOM_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['buildingUom'],
    }),

    // update
    updateBuildingUom: build.mutation({
      query: (data) => ({
        url: `${BUILDING_UOM_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['buildingUom'],
    }),

    // delete
    deleteBuildingUom: build.mutation({
      query: (id) => ({
        url: `${BUILDING_UOM_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['buildingUom'],
    }),
  }),
});

export const {
  useGetBuildingUomQuery,
  useGetSingleBuildingUomQuery,
  useCreateBuildingUomMutation,
  useUpdateBuildingUomMutation,
  useDeleteBuildingUomMutation,
} = buildingUomApi;
