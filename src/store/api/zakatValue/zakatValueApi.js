import { api } from '../../api/apiSlice';

const ZAKAT_VALUE_URL = '/zakat-value';

const zakatValueApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getZakatValues: build.query({
      query: (params) => ({
        url: ZAKAT_VALUE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          zakatValues: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['zakat'],
    }),

    // get single 
    getSingleZakatValue: build.query({
      query: (id) => ({
        url: `${ZAKAT_VALUE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['zakat'],
    }),

    // add 
    createZakatValue: build.mutation({
      query: (data) => ({
        url: `${ZAKAT_VALUE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['zakat'],
    }),

    // update 
    updateZakatValue: build.mutation({
      query: (data) => ({
        url: `${ZAKAT_VALUE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['zakat'],
    }),

    // delete
    deleteZakatValue: build.mutation({
      query: (id) => ({
        url: `${ZAKAT_VALUE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['zakat'],
    }),
  }),
});

export const {
  useGetZakatValuesQuery,
  useGetSingleZakatValueQuery,
  useCreateZakatValueMutation,
  useUpdateZakatValueMutation,
  useDeleteZakatValueMutation,
} = zakatValueApi;
