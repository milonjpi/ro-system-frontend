import { api } from '../../api/apiSlice';

const PRODUCT_URL = '/product';

const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getProducts: build.query({
      query: (params) => ({
        url: PRODUCT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          products: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['product'],
    }),

    // get single
    getSingleProduct: build.query({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['product'],
    }),

    // create
    createProduct: build.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['product'],
    }),

    // update
    updateProduct: build.mutation({
      query: (data) => ({
        url: `${PRODUCT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['product'],
    }),

    // delete
    deleteProduct: build.mutation({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['product'],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
