import { api } from '../../api/apiSlice';

const BUILDING_BRAND_URL = '/building-brand';

const buildingBrandApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getBuildingBrands: build.query({
      query: (params) => ({
        url: BUILDING_BRAND_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          buildingBrands: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['buildingBrand'],
    }),

    // get single
    getSingleBuildingBrand: build.query({
      query: (id) => ({
        url: `${BUILDING_BRAND_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['buildingBrand'],
    }),

    // create
    createBuildingBrand: build.mutation({
      query: (data) => ({
        url: `${BUILDING_BRAND_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['buildingBrand'],
    }),

    // update
    updateBuildingBrand: build.mutation({
      query: (data) => ({
        url: `${BUILDING_BRAND_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['buildingBrand'],
    }),

    // delete
    deleteBuildingBrand: build.mutation({
      query: (id) => ({
        url: `${BUILDING_BRAND_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['buildingBrand'],
    }),
  }),
});

export const {
  useGetBuildingBrandsQuery,
  useGetSingleBuildingBrandQuery,
  useCreateBuildingBrandMutation,
  useUpdateBuildingBrandMutation,
  useDeleteBuildingBrandMutation,
} = buildingBrandApi;
