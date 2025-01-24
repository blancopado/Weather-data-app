import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from "chart.js";
import type React from "react";
import { Bar } from "react-chartjs-2";
import type { WeatherData } from "../domain/Weather";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

interface BarChartProps {
	data: WeatherData[];
}

const BarChart: React.FC<BarChartProps> = ({ data }) => {
	const chartData = {
		labels: data.map((item) => item.date),
		datasets: [
			{
				label: "Rainfall (mm)",
				data: data.map((item) => item.rainfall),
				backgroundColor: "rgba(75, 192, 192, 0.6)",
				borderColor: "rgb(75, 192, 192)",
				borderWidth: 1,
			},
			{
				label: "Temperature (°C)",
				data: data.map((item) => item.temperature),
				backgroundColor: "rgba(255, 99, 132, 0.6)",
				borderColor: "rgb(255, 99, 132)",
				borderWidth: 1,
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
				text: "Environmental Data (Bar Chart)",
				color: "white",
			},
		},
		scales: {
			x: {
				stacked: false,
				ticks: { color: "white" },
				grid: {
					color: "rgba(255, 255, 255, 0.1)",
				},
			},
			y: {
				stacked: false,
				ticks: { color: "white" },
				grid: {
					color: "rgba(255, 255, 255, 0.1)",
				},
			},
		},
	};

	return <Bar data={chartData} options={options} />;
};

export default BarChart;
