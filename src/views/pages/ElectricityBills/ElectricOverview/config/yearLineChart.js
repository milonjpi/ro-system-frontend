import { electricYearIndex, electricYears } from 'assets/data';

const yearLineChart = {
  options: {
    chart: {
      width: '100%',
      height: 'auto',
      type: 'area',
      toolbar: {
        show: false,
      },
    },

    legend: {
      show: false,
    },

    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
    },

    xaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: [
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
            '#8c8c8c',
          ],
        },
      },
      categories: electricYears,
    },

    yaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 600,
          colors: ['#8c8c8c'],
        },
      },
    },

    tooltip: {
      y: {
        formatter: function (val) {
          return val + ' TK';
        },
      },
      x: {
        formatter: function (val) {
          return electricYearIndex[`${val}`];
        },
      },
    },
  },
};

export default yearLineChart;
