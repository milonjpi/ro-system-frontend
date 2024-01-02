import { api } from '../../api/apiSlice';

const EQUIPMENT_OUT_URL = '/equipment-out';

const equipmentOutApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getEquipmentOuts: build.query({
      query: (params) => ({
        url: EQUIPMENT_OUT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          equipmentOuts: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['equipmentOut'],
    }),

    // get single
    getSingleEquipmentOut: build.query({
      query: (id) => ({
        url: `${EQUIPMENT_OUT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['equipmentOut'],
    }),

    // create
    createEquipmentOut: build.mutation({
      query: (data) => ({
        url: `${EQUIPMENT_OUT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['equipmentOut'],
    }),

    // update
    updateEquipmentOut: build.mutation({
      query: (data) => ({
        url: `${EQUIPMENT_OUT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['equipmentOut'],
    }),

    // delete
    deleteEquipmentOut: build.mutation({
      query: (id) => ({
        url: `${EQUIPMENT_OUT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['equipmentOut'],
    }),
  }),
});

export const {
  useGetEquipmentOutsQuery,
  useGetSingleEquipmentOutQuery,
  useCreateEquipmentOutMutation,
  useUpdateEquipmentOutMutation,
  useDeleteEquipmentOutMutation,
} = equipmentOutApi;
