import { api } from '../../api/apiSlice';

const FIXED_ASSET_URL = '/fixed-asset';

const fixedAssetApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getFixedAssets: build.query({
      query: (params) => ({
        url: FIXED_ASSET_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          fixedAssets: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['fixed-asset'],
    }),

    // get single
    getSingleFixedAsset: build.query({
      query: (id) => ({
        url: `${FIXED_ASSET_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['fixed-asset'],
    }),

    // create
    createFixedAsset: build.mutation({
      query: (data) => ({
        url: `${FIXED_ASSET_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['fixed-asset'],
    }),

    // update
    updateFixedAsset: build.mutation({
      query: (data) => ({
        url: `${FIXED_ASSET_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['fixed-asset'],
    }),

    // delete
    deleteFixedAsset: build.mutation({
      query: (id) => ({
        url: `${FIXED_ASSET_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['fixed-asset'],
    }),
  }),
});

export const {
  useGetFixedAssetsQuery,
  useGetSingleFixedAssetQuery,
  useCreateFixedAssetMutation,
  useUpdateFixedAssetMutation,
  useDeleteFixedAssetMutation,
} = fixedAssetApi;
