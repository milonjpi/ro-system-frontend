import { api } from '../../api/apiSlice';

const INVESTMENT_URL = '/investment';

const investmentApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getInvestments: build.query({
      query: (params) => ({
        url: INVESTMENT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          investments: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['investment'],
    }),

    // get single
    getSingleInvestment: build.query({
      query: (id) => ({
        url: `${INVESTMENT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['investment'],
    }),

    // create
    createInvestment: build.mutation({
      query: (data) => ({
        url: `${INVESTMENT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['investment'],
    }),

    // update
    updateInvestment: build.mutation({
      query: (data) => ({
        url: `${INVESTMENT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['investment'],
    }),

    // delete
    deleteInvestment: build.mutation({
      query: (id) => ({
        url: `${INVESTMENT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['investment'],
    }),
  }),
});

export const {
  useGetInvestmentsQuery,
  useGetSingleInvestmentQuery,
  useCreateInvestmentMutation,
  useUpdateInvestmentMutation,
  useDeleteInvestmentMutation,
} = investmentApi;
