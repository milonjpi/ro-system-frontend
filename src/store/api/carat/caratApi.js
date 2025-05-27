import { api } from '../../api/apiSlice';

const CARAT_URL = '/carat';

const caratApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getCarats: build.query({
      query: (params) => ({
        url: CARAT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          carats: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['carat'],
    }),

    // get single
    getSingleCarat: build.query({
      query: (id) => ({
        url: `${CARAT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['carat'],
    }),

    // create
    createCarat: build.mutation({
      query: (data) => ({
        url: `${CARAT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['carat'],
    }),

    // update
    updateCarat: build.mutation({
      query: (data) => ({
        url: `${CARAT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['carat'],
    }),

    // delete
    deleteCarat: build.mutation({
      query: (id) => ({
        url: `${CARAT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['carat'],
    }),
  }),
});

export const {
  useGetCaratsQuery,
  useGetSingleCaratQuery,
  useCreateCaratMutation,
  useUpdateCaratMutation,
  useDeleteCaratMutation,
} = caratApi;
