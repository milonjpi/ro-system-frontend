import { api } from '../../api/apiSlice';

const VEHICLE_URL = '/vehicle';

const vehicleApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all parties
    getAllVehicles: build.query({
      query: (params) => ({
        url: VEHICLE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          vehicles: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['vehicle'],
    }),

    // get single vehicle
    getSingleVehicle: build.query({
      query: (id) => ({
        url: `${VEHICLE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['vehicle'],
    }),

    // add vehicle
    createVehicle: build.mutation({
      query: (data) => ({
        url: `${VEHICLE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['vehicle'],
    }),

    // update vehicle
    updateVehicle: build.mutation({
      query: (data) => ({
        url: `${VEHICLE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['vehicle'],
    }),
  }),
});

export const {
  useGetAllVehiclesQuery,
  useGetSingleVehicleQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
} = vehicleApi;
