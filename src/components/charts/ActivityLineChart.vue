<template>
  <line-chart style="max-height: 500px" :chart-data="chartData" :options="options"></line-chart>
</template>

<script>
import LineChart from '@/components/charts/types/LineChart.js';

export default {
  components: {
    LineChart,
  },
  props: {
    chartData: { type: Object, default: () => {} },
  },
  data() {
    return {
      options: {
        scales: {
          xAxes: [
            {
              display: true,
            },
          ],
        },
        legend: {
          display: true,
          position: 'bottom',
        },
        title: {
          display: false,
          fontSize: '18',
          text: 'Aggregated stats',
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    };
  },
};
</script>
