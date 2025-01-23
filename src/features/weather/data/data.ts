interface WeatherData {
	id: string;
	date: string;
	rainfall: number;
	temperature: number;
}

const sampleWeatherData: WeatherData[] = [
	{ id: "1", date: "2023-01-01", rainfall: 5.2, temperature: 12 },
	{ id: "2", date: "2023-01-02", rainfall: 3.1, temperature: 14 },
	{ id: "3", date: "2023-01-03", rainfall: 0.0, temperature: 17 },
	{ id: "4", date: "2023-01-04", rainfall: 2.5, temperature: 15 },
	{ id: "5", date: "2023-01-05", rainfall: 7.8, temperature: 11 },
	{ id: "6", date: "2023-01-06", rainfall: 1.3, temperature: 13 },
	{ id: "7", date: "2023-01-07", rainfall: 0.5, temperature: 16 },
	{ id: "8", date: "2023-01-08", rainfall: 4.7, temperature: 14 },
	{ id: "9", date: "2023-01-09", rainfall: 2.2, temperature: 15 },
	{ id: "10", date: "2023-01-10", rainfall: 0.8, temperature: 18 },
	{ id: "11", date: "2023-01-11", rainfall: 3.6, temperature: 16 },
	{ id: "12", date: "2023-01-12", rainfall: 6.1, temperature: 12 },
	{ id: "13", date: "2023-01-13", rainfall: 1.9, temperature: 14 },
	{ id: "14", date: "2023-01-14", rainfall: 0.3, temperature: 17 },
	{ id: "15", date: "2023-01-15", rainfall: 5.5, temperature: 13 },
	{ id: "16", date: "2023-01-16", rainfall: 2.8, temperature: 15 },
	{ id: "17", date: "2023-01-17", rainfall: 0.1, temperature: 19 },
	{ id: "18", date: "2023-01-18", rainfall: 4.2, temperature: 16 },
	{ id: "19", date: "2023-01-19", rainfall: 7.3, temperature: 11 },
	{ id: "20", date: "2023-01-20", rainfall: 1.6, temperature: 14 },
	{ id: "21", date: "2023-01-21", rainfall: 0.7, temperature: 18 },
	{ id: "22", date: "2023-01-22", rainfall: 3.9, temperature: 15 },
	{ id: "23", date: "2023-01-23", rainfall: 5.8, temperature: 12 },
	{ id: "24", date: "2023-01-24", rainfall: 2.4, temperature: 16 },
	{ id: "25", date: "2023-01-25", rainfall: 0.2, temperature: 20 },
];

export { type WeatherData, sampleWeatherData };
