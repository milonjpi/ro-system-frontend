import { api } from '../../api/apiSlice';

const DIST_REPORT_URL = '/dist-report';

const distReportApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get due report
    getDistDueReport: build.query({
      query: (params) => ({
        url: `${DIST_REPORT_URL}/due-report`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: ['distClient', 'distVoucher', 'distInvoice'],
    }),

    // get due report
    getDistAdvanceReport: build.query({
      query: (params) => ({
        url: `${DIST_REPORT_URL}/advance-report`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: ['distClient', 'distVoucher', 'distInvoice'],
    }),

    // summary
    distSummaryReport: build.query({
      query: (params) => ({
        url: `${DIST_REPORT_URL}/summary`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: ['distClient', 'distVoucher', 'distInvoice'],
    }),
    // get due report
    getDistDueAdvanceReport: build.query({
      query: (params) => ({
        url: `${DIST_REPORT_URL}/due-advance`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: ['distClient', 'distVoucher', 'distInvoice'],
    }),

    // get due report
    getDistDashboard: build.query({
      query: (params) => ({
        url: `${DIST_REPORT_URL}/dashboard`,
        method: 'GET',
        params: params,
      }),
      transformResponse: (response) => {
        return {
          report: response?.data,
        };
      },
      providesTags: ['distClient', 'distVoucher', 'distInvoice'],
    }),
  }),
});

export const {
  useGetDistDueReportQuery,
  useGetDistAdvanceReportQuery,
  useDistSummaryReportQuery,
  useGetDistDueAdvanceReportQuery,
  useGetDistDashboardQuery,
} = distReportApi;
