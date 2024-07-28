import { api } from '../../api/apiSlice';

const METER_URL = '/meter';

const meterApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getMeters: build.query({
      query: (params) => ({
        url: METER_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          meters: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['meter'],
    }),

    // get single
    getSingleMeter: build.query({
      query: (id) => ({
        url: `${METER_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['meter'],
    }),

    // create
    createMeter: build.mutation({
      query: (data) => ({
        url: `${METER_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['meter'],
    }),

    // update
    updateMeter: build.mutation({
      query: (data) => ({
        url: `${METER_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['meter'],
    }),

    // delete
    deleteMeter: build.mutation({
      query: (id) => ({
        url: `${METER_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['meter'],
    }),
  }),
});

export const {
  useGetMetersQuery,
  useGetSingleMeterQuery,
  useCreateMeterMutation,
  useUpdateMeterMutation,
  useDeleteMeterMutation,
} = meterApi;
