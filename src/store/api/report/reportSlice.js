import { api } from '../../api/apiSlice';

const REPORT_URL = '/report';

const reportSlice = api.injectEndpoints({
  endpoints: (build) => ({
    // get due report
    getDueReport: build.query({
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

    // summary
    summaryReport: build.query({
      query: (params) => ({
        url: `${REPORT_URL}/summary`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: ['customer', 'voucher', 'invoice'],
    }),

    // balance sheet
    balanceSheet: build.query({
      query: (params) => ({
        url: `${REPORT_URL}/balance-sheet`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: [
        'voucher',
        'invoice',
        'bill',
        'account-head',
        'fixed-asset',
        'investment',
        'fixed-asset',
        'withdraw',
        'expense',
      ],
    }),

    // donation report
    donationReport: build.query({
      query: (params) => ({
        url: `${REPORT_URL}/donation`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: [
        'voucher',
        'invoice',
        'bill',
        'account-head',
        'fixed-asset',
        'investment',
        'fixed-asset',
        'withdraw',
        'expense',
      ],
    }),

    // daily report
    dailyReport: build.query({
      query: (params) => ({
        url: `${REPORT_URL}/daily-report`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: [
        'voucher',
        'invoice',
        'bill',
        'account-head',
        'fixed-asset',
        'investment',
        'fixed-asset',
        'withdraw',
        'expense',
      ],
    }),
  }),
});

export const {
  useGetDueReportQuery,
  useGetAdvanceReportQuery,
  useSummaryReportQuery,
  useBalanceSheetQuery,
  useDonationReportQuery,
  useDailyReportQuery,
} = reportSlice;
