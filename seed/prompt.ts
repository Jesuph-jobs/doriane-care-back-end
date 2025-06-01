import { rl } from './services';

export const question = (query: string): Promise<string> => {
	return new Promise(resolve => rl.question(query, resolve));
};
