export class RSException extends Error {
	public code: string;
	public name: string;
	public httpCode: number;
	public group: string;

	constructor(message: string, name = 'UNKNOWN', httpCode = 500, group = '') {
		super(message);
		this.name = name;
		this.httpCode = httpCode;
		this.group = group;
	}
}

export const ERRORS = {
	NOT_JSON: new RSException(
		'Invalid JSON string',
		'NOT_JSON',
		400,
		'VALIDATION',
	),
};
