<template>
  <main>
    <radar-chart style="height: 400px" :chart-data="chartData" :options="options" />
  </main>
</template>

<script>
import RadarChart from '@/components/charts/types/RadarChart.js';

export default {
  components: {
    RadarChart,
  },
  props: {
    chartData: { type: Object, default: () => {} },
  },
  data() {
    return {
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scale: {
          ticks: {
            beginAtZero: true,
          },
        },
        legend: {
          position: 'bottom',
        },
        title: {
          display: false,
          fontSize: '20',
          text: 'Learning methods distribution',
        },
        animation: {
          animateScale: true,
          animateRotate: true,
        },
      },
    };
  },
};
</script>
