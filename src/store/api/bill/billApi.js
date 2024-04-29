import { api } from '../../api/apiSlice';

const BILL_URL = '/bill';

const billApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getBills: build.query({
      query: (params) => ({
        url: BILL_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          bills: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['bill'],
    }),

    // get single
    getSingleBill: build.query({
      query: (id) => ({
        url: `${BILL_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['bill'],
    }),

    // create
    createBill: build.mutation({
      query: (data) => ({
        url: `${BILL_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['bill'],
    }),

    // update
    updateBill: build.mutation({
      query: (data) => ({
        url: `${BILL_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['bill'],
    }),

    // delete
    deleteBill: build.mutation({
      query: (id) => ({
        url: `${BILL_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['bill'],
    }),
  }),
});

export const {
  useGetBillsQuery,
  useGetSingleBillQuery,
  useCreateBillMutation,
  useUpdateBillMutation,
  useDeleteBillMutation,
} = billApi;
