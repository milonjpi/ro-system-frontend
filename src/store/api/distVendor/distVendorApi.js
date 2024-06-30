import { api } from '../../api/apiSlice';

const DIST_VENDOR_URL = '/dist-vendor';

const distVendorApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getDistVendors: build.query({
      query: (params) => ({
        url: DIST_VENDOR_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          distVendors: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['distVendor', 'voucher'],
    }),

    // get single
    getSingleDistVendor: build.query({
      query: (id) => ({
        url: `${DIST_VENDOR_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['distVendor'],
    }),

    // create
    createDistVendor: build.mutation({
      query: (data) => ({
        url: `${DIST_VENDOR_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['distVendor'],
    }),

    // update
    updateDistVendor: build.mutation({
      query: (data) => ({
        url: `${DIST_VENDOR_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['distVendor'],
    }),

    // delete
    deleteDistVendor: build.mutation({
      query: (id) => ({
        url: `${DIST_VENDOR_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['distVendor'],
    }),
  }),
});

export const {
  useGetDistVendorsQuery,
  useGetSingleDistVendorQuery,
  useCreateDistVendorMutation,
  useUpdateDistVendorMutation,
  useDeleteDistVendorMutation,
} = distVendorApi;
