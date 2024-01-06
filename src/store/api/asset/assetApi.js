import { api } from '../../api/apiSlice';

const ASSET_URL = '/asset';

const assetApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getAssets: build.query({
      query: (params) => ({
        url: ASSET_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          assets: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['asset'],
    }),

    // get single
    getSingleAsset: build.query({
      query: (id) => ({
        url: `${ASSET_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['asset'],
    }),

    // create
    createAsset: build.mutation({
      query: (data) => ({
        url: `${ASSET_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['asset'],
    }),

    // update
    updateAsset: build.mutation({
      query: (data) => ({
        url: `${ASSET_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['asset'],
    }),

    // delete
    deleteAsset: build.mutation({
      query: (id) => ({
        url: `${ASSET_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['asset'],
    }),
  }),
});

export const {
  useGetAssetsQuery,
  useGetSingleAssetQuery,
  useCreateAssetMutation,
  useUpdateAssetMutation,
  useDeleteAssetMutation,
} = assetApi;
