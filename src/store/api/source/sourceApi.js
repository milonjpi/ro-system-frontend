import { api } from '../../api/apiSlice';

const SOURCE_URL = '/source';

const sourceApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getSources: build.query({
      query: (params) => ({
        url: SOURCE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          sources: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['source'],
    }),

    // get single
    getSingleSource: build.query({
      query: (id) => ({
        url: `${SOURCE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['source'],
    }),

    // create
    createSource: build.mutation({
      query: (data) => ({
        url: `${SOURCE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['source'],
    }),

    // update
    updateSource: build.mutation({
      query: (data) => ({
        url: `${SOURCE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['source'],
    }),

    // delete
    deleteSource: build.mutation({
      query: (id) => ({
        url: `${SOURCE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['source'],
    }),
  }),
});

export const {
  useGetSourcesQuery,
  useGetSingleSourceQuery,
  useCreateSourceMutation,
  useUpdateSourceMutation,
  useDeleteSourceMutation,
} = sourceApi;
