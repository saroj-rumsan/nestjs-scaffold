export interface ExceptionResponse {
	statusCode: number;
	errors?: any[] | string;
	name?: string;
	message?: string | object;
	group?: string;
	meta?: any;
	success?: boolean;
	path?: string;
	timestamp?: number;
}
