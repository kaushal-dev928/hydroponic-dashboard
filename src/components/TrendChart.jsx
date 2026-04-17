import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

// Register all required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  Filler
);

const OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  animation: false,
  plugins: {
    legend: {
      labels: {
        color: "#9ca3af",
        font: { size: 11 },
        boxWidth: 20,
        padding: 12,
      },
    },
    tooltip: {
      backgroundColor: "#0f1812",
      borderColor: "rgba(52,211,99,0.3)",
      borderWidth: 1,
      titleColor: "#34d363",
      bodyColor: "#c4dcc9",
    },
  },
  scales: {
    x: {
      ticks: { color: "#6b7280", font: { size: 10 }, maxRotation: 0, maxTicksLimit: 8 },
      grid: { color: "rgba(255,255,255,0.04)" },
    },
    y: {
      ticks: { color: "#6b7280", font: { size: 10 } },
      grid: { color: "rgba(255,255,255,0.04)" },
    },
  },
};

export default function TrendChart({ history }) {
  const chartData = {
    labels: history.labels,
    datasets: [
      {
        label: "Temp °C",
        data: history.temp,
        borderColor: "#34d363",
        backgroundColor: "rgba(52,211,99,0.05)",
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 1.5,
        fill: true,
      },
      {
        label: "Humidity %",
        data: history.hum,
        borderColor: "#facc15",
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 1.5,
      },
      {
        label: "TDS ppm",
        data: history.tds,
        borderColor: "#60a5fa",
        tension: 0.4,
        pointRadius: 2,
        borderWidth: 1.5,
        yAxisID: "y",
      },
    ],
  };

  return (
    <div className="card">
      <p className="label">SENSOR TREND · LAST 20 READINGS</p>
      <div className="chart-box">
        <Line data={chartData} options={OPTIONS} />
      </div>
    </div>
  );
}