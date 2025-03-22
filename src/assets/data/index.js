import { leapYear } from 'views/utilities/NeedyFunction';

export const roleValue = {
  super_admin: 'Super Admin',
  admin: 'Admin',
  user: 'User',
};

export const allOrderStatus = ['Pending', 'Delivered', 'Canceled'];
export const allInvoiceStatus = ['Due', 'Partial', 'Paid', 'Canceled'];

export const dueYears = ['2023', '2024', '2025', '2026', '2027'];
export const zakatYears = [
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
  '2027',
  '2028',
  '2029',
  '2030',
];
export const dueMonths = (year = new Date().getFullYear()) => {
  const isLeapYear = leapYear(parseInt(year));
  return [
    {
      label: 'January',
      value: '01',
      max: '31',
    },
    {
      label: 'February',
      value: '02',
      max: isLeapYear ? '29' : '28',
    },
    {
      label: 'March',
      value: '03',
      max: '31',
    },
    {
      label: 'April',
      value: '04',
      max: '30',
    },
    {
      label: 'May',
      value: '05',
      max: '31',
    },
    {
      label: 'June',
      value: '06',
      max: '30',
    },
    {
      label: 'July',
      value: '07',
      max: '31',
    },
    {
      label: 'August',
      value: '08',
      max: '31',
    },
    {
      label: 'September',
      value: '09',
      max: '30',
    },
    {
      label: 'October',
      value: '10',
      max: '31',
    },
    {
      label: 'November',
      value: '11',
      max: '30',
    },
    {
      label: 'December',
      value: '12',
      max: '31',
    },
  ];
};

export const electricMonths = [
  'JANUARY',
  'FEBRUARY',
  'MARCH',
  'APRIL',
  'MAY',
  'JUNE',
  'JULY',
  'AUGUST',
  'SEPTEMBER',
  'OCTOBER',
  'NOVEMBER',
  'DECEMBER',
];
export const allMonths = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const electricYears = [
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025',
  '2026',
];
export const electricYearIndex = {
  1: '2015',
  2: '2016',
  3: '2017',
  4: '2018',
  5: '2019',
  6: '2020',
  7: '2021',
  8: '2022',
  9: '2023',
  10: '2024',
  11: '2025',
  12: '2026',
};
