import { api } from '../../api/apiSlice';

const JEWELLERY_URL = '/jewellery';

const jewelleryApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getJewelleries: build.query({
      query: (params) => ({
        url: JEWELLERY_URL,
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
      providesTags: ['jewellery'],
    }),

    // get single
    getSingleJewellery: build.query({
      query: (id) => ({
        url: `${JEWELLERY_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['jewellery'],
    }),

    // create
    createJewellery: build.mutation({
      query: (data) => ({
        url: `${JEWELLERY_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['jewellery'],
    }),

    // update
    updateJewellery: build.mutation({
      query: (data) => ({
        url: `${JEWELLERY_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['jewellery'],
    }),

    // delete
    deleteJewellery: build.mutation({
      query: (id) => ({
        url: `${JEWELLERY_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['jewellery'],
    }),
  }),
});

export const {
  useGetJewelleriesQuery,
  useGetSingleJewelleryQuery,
  useCreateJewelleryMutation,
  useUpdateJewelleryMutation,
  useDeleteJewelleryMutation,
} = jewelleryApi;
