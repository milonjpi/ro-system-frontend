import { api } from '../../api/apiSlice';

const DR_PRODUCT_URL = '/dr-product';

const drProductApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getDrProducts: build.query({
      query: (params) => ({
        url: DR_PRODUCT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          drProducts: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['drProduct'],
    }),

    // get single
    getSingleDrProduct: build.query({
      query: (id) => ({
        url: `${DR_PRODUCT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['drProduct'],
    }),

    // create
    createDrProduct: build.mutation({
      query: (data) => ({
        url: `${DR_PRODUCT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['drProduct'],
    }),

    // update
    updateDrProduct: build.mutation({
      query: (data) => ({
        url: `${DR_PRODUCT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['drProduct'],
    }),

    // delete
    deleteDrProduct: build.mutation({
      query: (id) => ({
        url: `${DR_PRODUCT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['drProduct'],
    }),
  }),
});

export const {
  useGetDrProductsQuery,
  useGetSingleDrProductQuery,
  useCreateDrProductMutation,
  useUpdateDrProductMutation,
  useDeleteDrProductMutation,
} = drProductApi;
