import styles from "./App.module.css";

import { Divider, Provider, defaultTheme } from "@adobe/react-spectrum";
import { useCallback, useState } from "react";
import Navbar from "./components/navbar";
import type { WeatherData } from "./features/weather/domain/weather";
import sampleWeatherData from "./features/weather/infrastructure/data";
import BarChart from "./features/weather/ui/BarChart";
import LineChart from "./features/weather/ui/LineChart";
import Table from "./features/weather/ui/table/Table";

function App() {
	const [data, setData] = useState<WeatherData[]>(sampleWeatherData);
	const [visibleRange, setVisibleRange] = useState({ start: 0, end: 5 });
	const [unsavedChanges, setUnsavedChanges] = useState<WeatherData[]>([]);

	const handlePageChange = useCallback((start: number, end: number) => {
		setVisibleRange({ start, end });
	}, []);

	const handleDataChange = useCallback((updatedData: WeatherData) => {
		setUnsavedChanges((prev) => {
			const index = prev.findIndex((item) => item.id === updatedData.id);
			if (index !== -1) {
				return [...prev.slice(0, index), updatedData, ...prev.slice(index + 1)];
			}
			return [...prev, updatedData];
		});
	}, []);

	const handleSaveChanges = useCallback(() => {
		setData((prevData) => {
			const newData = [...prevData];
			// biome-ignore lint/complexity/noForEach: <explanation>
			unsavedChanges.forEach((change) => {
				const index = newData.findIndex((item) => item.id === change.id);
				if (index !== -1) {
					newData[index] = change;
				}
			});
			return newData;
		});
		setUnsavedChanges([]);
	}, [unsavedChanges]);

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
						onSaveChanges={handleSaveChanges}
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
