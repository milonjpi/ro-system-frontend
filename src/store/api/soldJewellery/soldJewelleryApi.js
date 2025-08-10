import { api } from '../../api/apiSlice';

const SOLD_JEWELLERY_URL = '/sold-jewellery';

const soldJewelleryApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getSoldJewelleries: build.query({
      query: (params) => ({
        url: SOLD_JEWELLERY_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          jewelleries: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['soldJewellery'],
    }),

    // get single
    getSingleSoldJewellery: build.query({
      query: (id) => ({
        url: `${SOLD_JEWELLERY_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['soldJewellery'],
    }),

    // create
    createSoldJewellery: build.mutation({
      query: (data) => ({
        url: `${SOLD_JEWELLERY_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['soldJewellery'],
    }),

    // update
    updateSoldJewellery: build.mutation({
      query: (data) => ({
        url: `${SOLD_JEWELLERY_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['soldJewellery'],
    }),

    // delete
    deleteSoldJewellery: build.mutation({
      query: (id) => ({
        url: `${SOLD_JEWELLERY_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['soldJewellery'],
    }),
  }),
});

export const {
  useGetSoldJewelleriesQuery,
  useGetSingleSoldJewelleryQuery,
  useCreateSoldJewelleryMutation,
  useUpdateSoldJewelleryMutation,
  useDeleteSoldJewelleryMutation,
} = soldJewelleryApi;
