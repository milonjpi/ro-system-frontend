import { api } from '../../api/apiSlice';

const BUILDING_VENDOR_URL = '/building-vendor';

const buildingVendorApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getBuildingVendors: build.query({
      query: (params) => ({
        url: BUILDING_VENDOR_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          buildingVendors: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['buildingVendor'],
    }),

    // get single
    getSingleBuildingVendor: build.query({
      query: (id) => ({
        url: `${BUILDING_VENDOR_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['buildingVendor'],
    }),

    // create
    createBuildingVendor: build.mutation({
      query: (data) => ({
        url: `${BUILDING_VENDOR_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['buildingVendor'],
    }),

    // update
    updateBuildingVendor: build.mutation({
      query: (data) => ({
        url: `${BUILDING_VENDOR_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['buildingVendor'],
    }),

    // delete
    deleteBuildingVendor: build.mutation({
      query: (id) => ({
        url: `${BUILDING_VENDOR_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['buildingVendor'],
    }),
  }),
});

export const {
  useGetBuildingVendorsQuery,
  useGetSingleBuildingVendorQuery,
  useCreateBuildingVendorMutation,
  useUpdateBuildingVendorMutation,
  useDeleteBuildingVendorMutation,
} = buildingVendorApi;
