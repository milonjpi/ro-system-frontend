import { api } from '../../api/apiSlice';

const JEWELLERY_TYPE_URL = '/jewellery-type';

const jewelleryTypeApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getJewelleryTypes: build.query({
      query: (params) => ({
        url: JEWELLERY_TYPE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          jewelleryTypes: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['jewelleryType'],
    }),

    // get single
    getSingleJewelleryType: build.query({
      query: (id) => ({
        url: `${JEWELLERY_TYPE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['jewelleryType'],
    }),

    // create
    createJewelleryType: build.mutation({
      query: (data) => ({
        url: `${JEWELLERY_TYPE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['jewelleryType'],
    }),

    // update
    updateJewelleryType: build.mutation({
      query: (data) => ({
        url: `${JEWELLERY_TYPE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['jewelleryType'],
    }),

    // delete
    deleteJewelleryType: build.mutation({
      query: (id) => ({
        url: `${JEWELLERY_TYPE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['jewelleryType'],
    }),
  }),
});

export const {
  useGetJewelleryTypesQuery,
  useGetSingleJewelleryTypeQuery,
  useCreateJewelleryTypeMutation,
  useUpdateJewelleryTypeMutation,
  useDeleteJewelleryTypeMutation,
} = jewelleryTypeApi;
