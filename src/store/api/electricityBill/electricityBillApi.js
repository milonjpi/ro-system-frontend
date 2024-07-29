import { api } from '../../api/apiSlice';

const ELECTRICITY_BILL_URL = '/electricity-bill';

const electricityBillApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getElectricityBills: build.query({
      query: (params) => ({
        url: ELECTRICITY_BILL_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          electricityBills: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['electricityBill'],
    }),

    // month summary
    getElectricMonthSummary: build.query({
      query: (params) => ({
        url: `${ELECTRICITY_BILL_URL}/month-summary`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['electricityBill'],
    }),

    // year summary
    getElectricYearSummary: build.query({
      query: (params) => ({
        url: `${ELECTRICITY_BILL_URL}/year-summary`,
        method: 'GET',
        params: params,
      }),
      providesTags: ['electricityBill'],
    }),

    // get single
    getSingleElectricityBill: build.query({
      query: (id) => ({
        url: `${ELECTRICITY_BILL_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['electricityBill'],
    }),

    // create
    createElectricityBill: build.mutation({
      query: (data) => ({
        url: `${ELECTRICITY_BILL_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['electricityBill'],
    }),

    // update
    updateElectricityBill: build.mutation({
      query: (data) => ({
        url: `${ELECTRICITY_BILL_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['electricityBill'],
    }),

    // delete
    deleteElectricityBill: build.mutation({
      query: (id) => ({
        url: `${ELECTRICITY_BILL_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['electricityBill'],
    }),
  }),
});

export const {
  useGetElectricityBillsQuery,
  useGetElectricMonthSummaryQuery,
  useGetElectricYearSummaryQuery,
  useGetSingleElectricityBillQuery,
  useCreateElectricityBillMutation,
  useUpdateElectricityBillMutation,
  useDeleteElectricityBillMutation,
} = electricityBillApi;
