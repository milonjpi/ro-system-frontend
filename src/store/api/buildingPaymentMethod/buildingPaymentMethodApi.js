import { api } from '../../api/apiSlice';

const BUILDING_PAYMENT_METHOD_URL = '/building-payment-method';

const buildingPaymentMethodApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getBuildingPaymentMethods: build.query({
      query: (params) => ({
        url: BUILDING_PAYMENT_METHOD_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          buildingPaymentMethods: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['buildingPaymentMethod'],
    }),

    // get single
    getSingleBuildingPaymentMethod: build.query({
      query: (id) => ({
        url: `${BUILDING_PAYMENT_METHOD_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['buildingPaymentMethod'],
    }),

    // create
    createBuildingPaymentMethod: build.mutation({
      query: (data) => ({
        url: `${BUILDING_PAYMENT_METHOD_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['buildingPaymentMethod'],
    }),

    // update
    updateBuildingPaymentMethod: build.mutation({
      query: (data) => ({
        url: `${BUILDING_PAYMENT_METHOD_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['buildingPaymentMethod'],
    }),

    // delete
    deleteBuildingPaymentMethod: build.mutation({
      query: (id) => ({
        url: `${BUILDING_PAYMENT_METHOD_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['buildingPaymentMethod'],
    }),
  }),
});

export const {
  useGetBuildingPaymentMethodsQuery,
  useGetSingleBuildingPaymentMethodQuery,
  useCreateBuildingPaymentMethodMutation,
  useUpdateBuildingPaymentMethodMutation,
  useDeleteBuildingPaymentMethodMutation,
} = buildingPaymentMethodApi;
