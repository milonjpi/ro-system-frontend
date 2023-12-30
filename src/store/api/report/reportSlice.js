import { api } from '../../api/apiSlice';

const REPORT_URL = '/report';

const reportSlice = api.injectEndpoints({
  endpoints: (build) => ({
    // get due report
    getDueReport: build.query({
      query: () => ({
        url: `${REPORT_URL}/due-report`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: ['customer', 'voucher', 'invoice'],
    }),

    // get due report
    getAdvanceReport: build.query({
      query: () => ({
        url: `${REPORT_URL}/advance-report`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: ['customer', 'voucher', 'invoice'],
    }),
  }),
});

export const { useGetDueReportQuery, useGetAdvanceReportQuery } = reportSlice;
