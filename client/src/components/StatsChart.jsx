import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function StatsChart() {
  const data = {
    labels: ["Scans", "Risks", "Secured"],
    datasets: [
      {
        label: "Digital Health Score",
        data: [8, 3, 5],
        backgroundColor: ["#3B82F6", "#EF4444", "#22C55E"],
      },
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-xl font-bold mb-4">Activity Graph</h2>
      <Bar data={data} height={120} />
    </div>
  );
}
