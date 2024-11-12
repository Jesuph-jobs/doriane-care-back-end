export function createDeferred<T>() {
	let resolve: (value: T | PromiseLike<T>) => void;
	let reject: (reason?: any) => void;

	const promise = new Promise<T>((res, rej) => {
		resolve = res;
		reject = rej;
	});

	// TypeScript asserts that `resolve` and `reject` are defined here.
	return { promise, resolve: resolve!, reject: reject! };
}
