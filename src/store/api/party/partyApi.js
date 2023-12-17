import { api } from '../../api/apiSlice';

const PARTY_URL = '/party';

const partyApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get all parties
    parties: build.query({
      query: (params) => ({
        url: PARTY_URL,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          parties: response?.data,
          meta: response?.meta,
        };
      },
      providesTags: ['party'],
    }),

    // get single party
    party: build.query({
      query: (id) => ({
        url: `${PARTY_URL}/${id}`,
        method: 'GET',
      }),
      providesTags: ['party'],
    }),

    // add party
    addParty: build.mutation({
      query: (data) => ({
        url: `${PARTY_URL}/create`,
        method: 'POST',
        data: data,
      }),
      invalidatesTags: ['party'],
    }),

    // update party
    updateParty: build.mutation({
      query: (data) => ({
        url: `${PARTY_URL}/${data?.id}`,
        method: 'PATCH',
        data: data?.body,
      }),
      invalidatesTags: ['party'],
    }),

    // inactive party
    inactiveParty: build.mutation({
      query: (id) => ({
        url: `${PARTY_URL}/${id}/inactive`,
        method: 'PATCH',
      }),
      invalidatesTags: ['party'],
    }),
  }),
});

export const {
  usePartiesQuery,
  usePartyQuery,
  useAddPartyMutation,
  useUpdatePartyMutation,
  useInactivePartyMutation,
} = partyApi;
