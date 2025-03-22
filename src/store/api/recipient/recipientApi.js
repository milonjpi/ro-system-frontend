import { api } from '../../api/apiSlice';

const RECIPIENT_URL = '/recipient';

const recipientApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getRecipients: build.query({
      query: (params) => ({
        url: RECIPIENT_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          recipients: response?.data?.data,
          meta: response?.meta,
          sum: response?.data?.sum,
        };
      },
      providesTags: ['recipient'],
    }),

    // get single recipient
    getSingleRecipient: build.query({
      query: (id) => ({
        url: `${RECIPIENT_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['recipient'],
    }),

    // add recipient
    createRecipient: build.mutation({
      query: (data) => ({
        url: `${RECIPIENT_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['recipient'],
    }),

    // update recipient
    updateRecipient: build.mutation({
      query: (data) => ({
        url: `${RECIPIENT_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['recipient'],
    }),

    // delete
    deleteRecipient: build.mutation({
      query: (id) => ({
        url: `${RECIPIENT_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['recipient'],
    }),
  }),
});

export const {
  useGetRecipientsQuery,
  useGetSingleRecipientQuery,
  useCreateRecipientMutation,
  useUpdateRecipientMutation,
  useDeleteRecipientMutation,
} = recipientApi;
