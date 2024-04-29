import { api } from '../../api/apiSlice';

const REPORT_URL = '/payment-report';

const paymentReportSlice = api.injectEndpoints({
  endpoints: (build) => ({
    // get due report
    getPaymentDueReport: build.query({
      query: (params) => ({
        url: `${REPORT_URL}/due-report`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: ['vendor', 'voucher', 'bill'],
    }),

    // get due report
    getPaymentAdvanceReport: build.query({
      query: () => ({
        url: `${REPORT_URL}/advance-report`,
        method: 'GET',
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: ['vendor', 'voucher', 'bill'],
    }),
  }),
});

export const { useGetPaymentDueReportQuery, useGetPaymentAdvanceReportQuery } =
  paymentReportSlice;
