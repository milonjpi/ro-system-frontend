import { api } from '../../api/apiSlice';

const ZAKAT_URL = '/zakat';

const zakatApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getZakats: build.query({
      query: (params) => ({
        url: ZAKAT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          zakats: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['zakat'],
    }),

    // get single zakat
    getSingleZakat: build.query({
      query: (id) => ({
        url: `${ZAKAT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['zakat'],
    }),

    // add zakat
    createZakat: build.mutation({
      query: (data) => ({
        url: `${ZAKAT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['zakat'],
    }),

    // update zakat
    updateZakat: build.mutation({
      query: (data) => ({
        url: `${ZAKAT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['zakat'],
    }),

    // delete
    deleteZakat: build.mutation({
      query: (id) => ({
        url: `${ZAKAT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['zakat'],
    }),
  }),
});

export const {
  useGetZakatsQuery,
  useGetSingleZakatQuery,
  useCreateZakatMutation,
  useUpdateZakatMutation,
  useDeleteZakatMutation,
} = zakatApi;
