import styles from "./App.module.css";

import { Divider, Provider, defaultTheme } from "@adobe/react-spectrum";
import { useCallback, useState } from "react";
import Navbar from "./components/navbar";
import type { WeatherData } from "./features/weather/domain/Weather";
import sampleWeatherData from "./features/weather/infrastructure/data";
import BarChart from "./features/weather/ui/BarChart";
import LineChart from "./features/weather/ui/LineChart";
import Table from "./features/weather/ui/table/Table";

function App() {
	const [data, setData] = useState<WeatherData[]>(sampleWeatherData);
	const [visibleRange, setVisibleRange] = useState({ start: 0, end: 5 });
	const handlePageChange = useCallback((start: number, end: number) => {
		setVisibleRange({ start, end });
	}, []);

	const handleDataChange = useCallback((updatedData: WeatherData) => {
		setData((prevData) => {
			const newData = [...prevData];
			const index = newData.findIndex((item) => item.id === updatedData.id);
			if (index !== -1) {
				newData[index] = updatedData;
			}
			return newData;
		});
	}, []);

	const visibleData = data.slice(visibleRange.start, visibleRange.end);

	return (
		<Provider theme={defaultTheme}>
			<main className={styles.appWrapper}>
				<Navbar />

				<section className={styles.appContent}>
					<Table
						data={visibleData}
						onPageChange={handlePageChange}
						onDataChange={handleDataChange}
					/>
					<Divider size="S" />
					<div className={styles.charts}>
						<LineChart data={visibleData} />
						<BarChart data={visibleData} />
					</div>
				</section>
			</main>
		</Provider>
	);
}

export default App;
