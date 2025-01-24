import { Weather } from "../domain/Weather";
import type WeatherRepository from "../domain/WeatherRepository";
import sampleWeatherData from "./data";

class WeatherFakeAsyncRepository implements WeatherRepository {
	// fake http request
	async findAll(): Promise<Weather[]> {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve(
					sampleWeatherData.map(
						(data) =>
							new Weather(data.id, data.date, data.rainfall, data.temperature),
					),
				);
			}, 300);
		});
	}
}

export default WeatherFakeAsyncRepository;
