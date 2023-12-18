import { api } from '../../api/apiSlice';

const SALES_ORDER_URL = '/sales-order';

const salesOrderApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getSalesOrders: build.query({
      query: (params) => ({
        url: SALES_ORDER_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          salesOrders: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['sales-order'],
    }),

    // get single
    getSingleSalesOrder: build.query({
      query: (id) => ({
        url: `${SALES_ORDER_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['sales-order'],
    }),

    // create
    createSalesOrder: build.mutation({
      query: (data) => ({
        url: `${SALES_ORDER_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['sales-order'],
    }),

    // update
    updateSalesOrder: build.mutation({
      query: (data) => ({
        url: `${SALES_ORDER_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['sales-order'],
    }),

    // delete
    deleteSalesOrder: build.mutation({
      query: (id) => ({
        url: `${SALES_ORDER_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['sales-order'],
    }),

    // delete
    cancelSalesOrder: build.mutation({
      query: (id) => ({
        url: `${SALES_ORDER_URL}/${id}/cancel`,
        method: 'PATCH',
      }),
      invalidatesTags: ['sales-order'],
    }),
  }),
});

export const {
  useGetSalesOrdersQuery,
  useGetSingleSalesOrderQuery,
  useCreateSalesOrderMutation,
  useUpdateSalesOrderMutation,
  useDeleteSalesOrderMutation,
  useCancelSalesOrderMutation,
} = salesOrderApi;
