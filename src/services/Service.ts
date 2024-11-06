import { cLogger } from '$server/console';

export default class Service<T> {
	public id: string;
	public name = 'Service';
	public category = 'Service';
	public description = 'An abstract service to handle connections.';

	public startedAt: Date;
	public endedAt: Date | null = null;

	protected connection: Promise<T>;

	public get Connection(): Promise<T> {
		return this.connection;
	}

	constructor(id: string, connection: Promise<T>) {
		this.id = id;
		this.startedAt = new Date();
		this.connection = connection;
		connection.then(() => {
			this.endedAt = new Date();
			cLogger.info(`${this.toString()} - Connection established.`);
		});
	}

	// abstract stop method
	public stop(): Promise<unknown> {
		throw new Error(`Stop not implemented. ${this.toString()}`);
	}
	// abstract restart method
	public restart(): Promise<unknown> {
		throw new Error(`Restart not implemented. ${this.toString()}`);
	}
	// to string
	public toString(): string {
		const initiatedIn = this.endedAt
			? this.endedAt.getTime() - this.startedAt.getTime()
			: /* istanbul ignore next */ 0;
		return `${this.id} - ${this.name} - ${this.category} - ${this.description}/ ${
			initiatedIn ? `Initiated in ${initiatedIn}ms` : 'Not initiated yet.'
		}`;
	}
}
