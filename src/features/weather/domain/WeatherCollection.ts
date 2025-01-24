import type { Weather } from "./Weather";

class WeatherCollection {
	constructor(private weatherArray: Weather[]) {}

	getWeathers(): Weather[] {
		return this.weatherArray;
	}

	addWeather(weather: Weather): void {
		this.weatherArray.push(weather);
	}
}

export default WeatherCollection;
