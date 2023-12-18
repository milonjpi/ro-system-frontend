import { api } from '../../api/apiSlice';

const ACCOUNT_TYPE_URL = '/account-type';

const accountTypeApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getAccountTypes: build.query({
      query: (params) => ({
        url: ACCOUNT_TYPE_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          accountTypes: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['account-type'],
    }),

    // get single
    getSingleAccountType: build.query({
      query: (id) => ({
        url: `${ACCOUNT_TYPE_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['account-type'],
    }),

    // create
    createAccountType: build.mutation({
      query: (data) => ({
        url: `${ACCOUNT_TYPE_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['account-type'],
    }),

    // update
    updateAccountType: build.mutation({
      query: (data) => ({
        url: `${ACCOUNT_TYPE_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['account-type'],
    }),

    // delete
    deleteAccountType: build.mutation({
      query: (id) => ({
        url: `${ACCOUNT_TYPE_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['account-type'],
    }),
  }),
});

export const {
  useGetAccountTypesQuery,
  useGetSingleAccountTypeQuery,
  useCreateAccountTypeMutation,
  useUpdateAccountTypeMutation,
  useDeleteAccountTypeMutation,
} = accountTypeApi;
