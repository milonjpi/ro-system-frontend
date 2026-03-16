import { api } from '../../api/apiSlice';

const RECIPIENT_GROUP_URL = '/recipient-group';

const recipientGroupApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all
    getRecipientGroups: build.query({
      query: (params) => ({
        url: RECIPIENT_GROUP_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          recipientGroups: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['recipientGroup'],
    }),

    // get single recipientGroup
    getSingleRecipientGroup: build.query({
      query: (id) => ({
        url: `${RECIPIENT_GROUP_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['recipientGroup'],
    }),

    // add recipientGroup
    createRecipientGroup: build.mutation({
      query: (data) => ({
        url: `${RECIPIENT_GROUP_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['recipientGroup'],
    }),

    // update recipientGroup
    updateRecipientGroup: build.mutation({
      query: (data) => ({
        url: `${RECIPIENT_GROUP_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['recipientGroup'],
    }),

    // delete
    deleteRecipientGroup: build.mutation({
      query: (id) => ({
        url: `${RECIPIENT_GROUP_URL}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['recipientGroup'],
    }),
  }),
});

export const {
  useGetRecipientGroupsQuery,
  useGetSingleRecipientGroupQuery,
  useCreateRecipientGroupMutation,
  useUpdateRecipientGroupMutation,
  useDeleteRecipientGroupMutation,
} = recipientGroupApi;
