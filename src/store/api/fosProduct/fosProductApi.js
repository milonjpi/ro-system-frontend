import { api } from '../../api/apiSlice';

const FOS_PRODUCT_URL = '/fos-product';

const fosProductApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getFosProducts: build.query({
      query: (params) => ({
        url: FOS_PRODUCT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          fosProducts: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['fosProduct'],
    }),

    // get single
    getSingleFosProduct: build.query({
      query: (id) => ({
        url: `${FOS_PRODUCT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['fosProduct'],
    }),

    // create
    createFosProduct: build.mutation({
      query: (data) => ({
        url: `${FOS_PRODUCT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['fosProduct'],
    }),

    // update
    updateFosProduct: build.mutation({
      query: (data) => ({
        url: `${FOS_PRODUCT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['fosProduct'],
    }),

    // delete
    deleteFosProduct: build.mutation({
      query: (id) => ({
        url: `${FOS_PRODUCT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['fosProduct'],
    }),
  }),
});

export const {
  useGetFosProductsQuery,
  useGetSingleFosProductQuery,
  useCreateFosProductMutation,
  useUpdateFosProductMutation,
  useDeleteFosProductMutation,
} = fosProductApi;
