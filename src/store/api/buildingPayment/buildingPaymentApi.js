import { api } from '../../api/apiSlice';

const BUILDING_PAYMENT_URL = '/building-payment';

const buildingPaymentApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getBuildingPayments: build.query({
      query: (params) => ({
        url: BUILDING_PAYMENT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          buildingPayments: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['buildingPayment'],
    }),

    // get single
    getSingleBuildingPayment: build.query({
      query: (id) => ({
        url: `${BUILDING_PAYMENT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['buildingPayment'],
    }),

    // create
    createBuildingPayment: build.mutation({
      query: (data) => ({
        url: `${BUILDING_PAYMENT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['buildingPayment'],
    }),

    // update
    updateBuildingPayment: build.mutation({
      query: (data) => ({
        url: `${BUILDING_PAYMENT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['buildingPayment'],
    }),

    // delete
    deleteBuildingPayment: build.mutation({
      query: (id) => ({
        url: `${BUILDING_PAYMENT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['buildingPayment'],
    }),
  }),
});

export const {
  useGetBuildingPaymentsQuery,
  useGetSingleBuildingPaymentQuery,
  useCreateBuildingPaymentMutation,
  useUpdateBuildingPaymentMutation,
  useDeleteBuildingPaymentMutation,
} = buildingPaymentApi;
