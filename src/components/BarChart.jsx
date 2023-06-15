import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Hasil Perhitungan",
    },
  },
};

const BarChart = ({ chartData }) => {
  // console.log(chartData);
  // return <Bar data={chartData} />;
  return <Bar options={options} data={chartData} />;
};

export default BarChart;
