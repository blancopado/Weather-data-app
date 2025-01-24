import type { Weather } from "./Weather";

interface WeatherRepository {
	findAll(): Promise<Weather[]>;
}

export default WeatherRepository;
