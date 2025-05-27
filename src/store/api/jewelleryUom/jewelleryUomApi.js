import { api } from '../../api/apiSlice';

const JEWELLERY_UOM_URL = '/jewellery-uom';

const jewelleryUomApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getJewelleryUom: build.query({
      query: (params) => ({
        url: JEWELLERY_UOM_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          jewelleryUom: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['jewelleryUom'],
    }),

    // get single
    getSingleJewelleryUom: build.query({
      query: (id) => ({
        url: `${JEWELLERY_UOM_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['jewelleryUom'],
    }),

    // create
    createJewelleryUom: build.mutation({
      query: (data) => ({
        url: `${JEWELLERY_UOM_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['jewelleryUom'],
    }),

    // update
    updateJewelleryUom: build.mutation({
      query: (data) => ({
        url: `${JEWELLERY_UOM_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['jewelleryUom'],
    }),

    // delete
    deleteJewelleryUom: build.mutation({
      query: (id) => ({
        url: `${JEWELLERY_UOM_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['jewelleryUom'],
    }),
  }),
});

export const {
  useGetJewelleryUomQuery,
  useGetSingleJewelleryUomQuery,
  useCreateJewelleryUomMutation,
  useUpdateJewelleryUomMutation,
  useDeleteJewelleryUomMutation,
} = jewelleryUomApi;
