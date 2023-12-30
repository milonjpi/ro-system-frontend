import { api } from '../../api/apiSlice';

const VENDOR_URL = '/vendor';

const vendorApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all parties
    getAllVendors: build.query({
      query: (params) => ({
        url: VENDOR_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          vendors: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['vendor'],
    }),

    // get single vendor
    getSingleVendor: build.query({
      query: (id) => ({
        url: `${VENDOR_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['vendor'],
    }),

    // add vendor
    createVendor: build.mutation({
      query: (data) => ({
        url: `${VENDOR_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['vendor'],
    }),

    // update vendor
    updateVendor: build.mutation({
      query: (data) => ({
        url: `${VENDOR_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['vendor'],
    }),

    // vendor details
    vendorDetails: build.query({
      query: (params) => ({
        url: `${VENDOR_URL}/vendor-details`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          vendors: response?.data,
        };
      },
      providesTags: ['vendor', 'voucher', 'bill'],
    }),
  }),
});

export const {
  useGetAllVendorsQuery,
  useGetSingleVendorQuery,
  useCreateVendorMutation,
  useUpdateVendorMutation,
  useVendorDetailsQuery,
} = vendorApi;
