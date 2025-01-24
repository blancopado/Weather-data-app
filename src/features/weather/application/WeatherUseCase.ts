import type { Weather } from "../domain/Weather";
import type WeatherRepository from "../domain/WeatherRepository";

class WeatherUseCase {
	private readonly weatherRepository;

	constructor(weatherRepository: WeatherRepository) {
		this.weatherRepository = weatherRepository;
	}

	async getAll(): Promise<Weather[]> {
		return await this.weatherRepository.findAll();
	}
}

export default WeatherUseCase;
