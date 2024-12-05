import os from 'node:os';
import path from 'node:path';

// Function to resolve '~' to home directory
export function resolvePath(inputPath: string) {
	if (inputPath.startsWith('~')) {
		return path.join(os.homedir(), inputPath.slice(1));
	}
	return path.resolve(inputPath);
}
