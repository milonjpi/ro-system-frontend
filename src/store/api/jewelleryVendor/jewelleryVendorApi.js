import { api } from '../../api/apiSlice';

const JEWELLERY_VENDOR_URL = '/jewellery-vendor';

const jewelleryVendorApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getJewelleryVendors: build.query({
      query: (params) => ({
        url: JEWELLERY_VENDOR_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          jewelleryVendors: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['jewelleryVendor'],
    }),

    // get single
    getSingleJewelleryVendor: build.query({
      query: (id) => ({
        url: `${JEWELLERY_VENDOR_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['jewelleryVendor'],
    }),

    // create
    createJewelleryVendor: build.mutation({
      query: (data) => ({
        url: `${JEWELLERY_VENDOR_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['jewelleryVendor'],
    }),

    // update
    updateJewelleryVendor: build.mutation({
      query: (data) => ({
        url: `${JEWELLERY_VENDOR_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['jewelleryVendor'],
    }),

    // delete
    deleteJewelleryVendor: build.mutation({
      query: (id) => ({
        url: `${JEWELLERY_VENDOR_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['jewelleryVendor'],
    }),
  }),
});

export const {
  useGetJewelleryVendorsQuery,
  useGetSingleJewelleryVendorQuery,
  useCreateJewelleryVendorMutation,
  useUpdateJewelleryVendorMutation,
  useDeleteJewelleryVendorMutation,
} = jewelleryVendorApi;
