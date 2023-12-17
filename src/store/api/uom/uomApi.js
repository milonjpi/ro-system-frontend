import { api } from '../../api/apiSlice';

const UOM_URL = '/uom';

const uomApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getUom: build.query({
      query: (params) => ({
        url: UOM_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          uom: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['uom'],
    }),

    // get single
    getSingleUom: build.query({
      query: (id) => ({
        url: `${UOM_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['uom'],
    }),

    // create
    createUom: build.mutation({
      query: (data) => ({
        url: `${UOM_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['uom'],
    }),

    // update
    updateUom: build.mutation({
      query: (data) => ({
        url: `${UOM_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['uom'],
    }),

    // delete
    deleteUom: build.mutation({
      query: (id) => ({
        url: `${UOM_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['uom'],
    }),
  }),
});

export const {
  useGetUomQuery,
  useGetSingleUomQuery,
  useCreateUomMutation,
  useUpdateUomMutation,
  useDeleteUomMutation,
} = uomApi;
