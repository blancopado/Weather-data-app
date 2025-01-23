import {
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LineElement,
	LinearScale,
	PointElement,
	Title,
	Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { WeatherData } from "../domain/weather";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
);

interface ChartProps {
	data: WeatherData[];
}

const LineChart: React.FC<ChartProps> = ({ data }) => {
	const chartData = {
		labels: data.map((item) => item.date),
		datasets: [
			{
				label: "Rainfall (mm)",
				data: data.map((item) => item.rainfall),
				borderColor: "rgb(75, 192, 192)",
				tension: 0.1,
			},
			{
				label: "Temperature (°C)",
				data: data.map((item) => item.temperature),
				borderColor: "rgb(255, 99, 132)",
				tension: 0.1,
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top" as const,
				labels: {
					color: "white",
				},
			},
			title: {
				display: true,
				text: "Environmental Data",
				color: "white",
			},
		},
		scales: {
			x: {
				ticks: { color: "white" },
				grid: {
					color: "rgba(255, 255, 255, 0.1)",
				},
			},
			y: {
				ticks: { color: "white" },
				grid: {
					color: "rgba(255, 255, 255, 0.1)",
				},
			},
		},
	};

	return <Line data={chartData} options={options} />;
};

export default LineChart;
