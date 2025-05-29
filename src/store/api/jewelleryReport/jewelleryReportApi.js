import { api } from '../../api/apiSlice';

const JEWELLERY_REPORT_URL = '/jewellery-report';

const jewelleryReportApi = api.injectEndpoints({
  endpoints: (build) => ({
    // get jewellery summary
    getJewellerySummary: build.query({
      query: (params) => ({
        url: `${JEWELLERY_REPORT_URL}/summary`,
        method: 'GET',
        params: params,
      }),
      providesTags: [
        'jewellery',
        'jewelleryRate',
        'jewelleryType',
        'jewelleryVendor',
      ],
    }),
    // get carat wise summary
    getCaratWiseSummary: build.query({
      query: (params) => ({
        url: `${JEWELLERY_REPORT_URL}/carat`,
        method: 'GET',
        params: params,
      }),
      providesTags: [
        'jewellery',
        'jewelleryRate',
        'jewelleryType',
        'jewelleryVendor',
      ],
    }),
    // get type wise summary
    getTypeWiseSummary: build.query({
      query: (params) => ({
        url: `${JEWELLERY_REPORT_URL}/type`,
        method: 'GET',
        params: params,
      }),
      providesTags: [
        'jewellery',
        'jewelleryRate',
        'jewelleryType',
        'jewelleryVendor',
      ],
    }),
    // get zakat calculation
    getZakatCalculation: build.query({
      query: (params) => ({
        url: `${JEWELLERY_REPORT_URL}/zakat`,
        method: 'GET',
        params: params,
      }),
      providesTags: [
        'jewellery',
        'jewelleryRate',
        'jewelleryType',
        'jewelleryVendor',
      ],
    }),
  }),
});

export const {
  useGetJewellerySummaryQuery,
  useGetCaratWiseSummaryQuery,
  useGetTypeWiseSummaryQuery,
  useGetZakatCalculationQuery,
} = jewelleryReportApi;
