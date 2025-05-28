import { api } from '../../api/apiSlice';

const JEWELLERY_RATE_URL = '/jewellery-rate';

const jewelleryRateApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getJewelleryRates: build.query({
      query: (params) => ({
        url: JEWELLERY_RATE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          jewelleryRates: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['jewelleryRate'],
    }),

    // get distinct date
    getDistinctDates: build.query({
      query: (params) => ({
        url: `${JEWELLERY_RATE_URL}/date`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['jewelleryRate'],
    }),

    // get single
    getSingleJewelleryRate: build.query({
      query: (id) => ({
        url: `${JEWELLERY_RATE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['jewelleryRate'],
    }),

    // create
    createJewelleryRate: build.mutation({
      query: (data) => ({
        url: `${JEWELLERY_RATE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['jewelleryRate'],
    }),

    // update
    updateJewelleryRate: build.mutation({
      query: (data) => ({
        url: `${JEWELLERY_RATE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['jewelleryRate'],
    }),

    // delete
    deleteJewelleryRate: build.mutation({
      query: (id) => ({
        url: `${JEWELLERY_RATE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['jewelleryRate'],
    }),
  }),
});

export const {
  useGetJewelleryRatesQuery,
  useGetDistinctDatesQuery,
  useGetSingleJewelleryRateQuery,
  useCreateJewelleryRateMutation,
  useUpdateJewelleryRateMutation,
  useDeleteJewelleryRateMutation,
} = jewelleryRateApi;
