class Weather {
	constructor(
		public id: string,
		public date: string,
		public rainfall: number,
		public temperature: number,
	) {
		this.id = id;
		this.date = date;
		this.rainfall = rainfall;
		this.temperature = temperature;
	}

	isRainy(): boolean {
		return this.rainfall > 50;
	}
}

type WeatherData = Pick<Weather, "id" | "date" | "rainfall" | "temperature">;

export { type WeatherData, Weather };
