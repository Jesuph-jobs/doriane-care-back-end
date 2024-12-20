import { readFile, writeFile } from 'node:fs/promises';

import { cLogger } from '$server/console';

import { ExitCodes } from '@server/config/errors';

// Function to read the text file and return its contents as a string
export async function readTextFile(filePath: string) {
	try {
		const text = await readFile(filePath, 'utf8');
		return text;
	} catch (error) {
		cLogger.error(`🗃️ Error reading file: ${error instanceof Error ? error.message : JSON.stringify(error as any)}`);
		process.exit(ExitCodes.ERROR_FILE_NOT_FOUND.code);
	}
}

export async function readJSONFile<T = unknown>(filePath: string) {
	try {
		const text = await readFile(filePath, 'utf8');
		return JSON.parse(text) as T;
	} catch (error) {
		cLogger.error(`🗃️ Error reading file: ${error instanceof Error ? error.message : JSON.stringify(error as any)}`);
		process.exit(ExitCodes.ERROR_FILE_NOT_FOUND.code);
	}
}

export async function writeJSONFile<T>(filePath: string, data: T) {
	try {
		await writeFile(filePath, JSON.stringify(data));
	} catch (error) {
		cLogger.error(`🗃️ Error writing file: ${error instanceof Error ? error.message : JSON.stringify(error as any)}`);
		process.exit(ExitCodes.ERROR_FILE_NOT_FOUND.code);
	}
}
