import { api } from '../../api/apiSlice';

const EQUIPMENT_IN_URL = '/equipment-in';

const equipmentInApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getEquipmentIns: build.query({
      query: (params) => ({
        url: EQUIPMENT_IN_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          equipmentIns: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['equipmentIn'],
    }),

    // get single
    getSingleEquipmentIn: build.query({
      query: (id) => ({
        url: `${EQUIPMENT_IN_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['equipmentIn'],
    }),

    // create
    createEquipmentIn: build.mutation({
      query: (data) => ({
        url: `${EQUIPMENT_IN_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['equipmentIn'],
    }),

    // update
    updateEquipmentIn: build.mutation({
      query: (data) => ({
        url: `${EQUIPMENT_IN_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['equipmentIn'],
    }),

    // delete
    deleteEquipmentIn: build.mutation({
      query: (id) => ({
        url: `${EQUIPMENT_IN_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['equipmentIn'],
    }),
  }),
});

export const {
  useGetEquipmentInsQuery,
  useGetSingleEquipmentInQuery,
  useCreateEquipmentInMutation,
  useUpdateEquipmentInMutation,
  useDeleteEquipmentInMutation,
} = equipmentInApi;
