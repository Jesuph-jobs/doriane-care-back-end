import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import { readJSONFile, writeJSONFile } from '@server/utils/File';
export interface City {
	id: number;
	commune_name_ascii: string;
	commune_name: string;
	daira_name_ascii: string;
	daira_name: string;
	wilaya_code: string;
	wilaya_name_ascii: string;
	wilaya_name: string;
}

export async function loadCities(): Promise<ProvinceCityI[][]> {
	const cities = await readJSONFile<City[]>(path.join(__dirname, 'algeria_cities.json'));
	return cities.reduce<ProvinceCityI[][]>((acc, c) => {
		const city: ProvinceCityI = {
			id: c.id,
			name: {
				en: c.commune_name_ascii,
				fr: c.commune_name_ascii,
				ar: c.commune_name,
			},
		};
		if (acc[Number(c.wilaya_code)]) {
			acc[Number(c.wilaya_code)].push(city);
		} else {
			acc[Number(c.wilaya_code)] = [city];
		}
		return acc;
	}, [] as ProvinceCityI[][]);
}
export async function saveCities(cities: ProvinceCityI[][]) {
	await mkdir(path.join(__dirname, 'cities'), { recursive: true });
	return Promise.all(cities.map((city, i) => writeJSONFile(path.join(__dirname, 'cities', `${i}.json`), city)));
}
