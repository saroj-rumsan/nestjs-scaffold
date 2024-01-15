import { HttpException } from '@nestjs/common';
import { ExceptionResponse } from '../interface';
import { RSException } from './rs.exception';

export class ExceptionHandler {
	private static isObjectWithErrors(value: any): value is { errors: any[] } {
		return typeof value === 'object' && value !== null && 'errors' in value;
	}
	static handleHttpException(
		exception: HttpException,
		responseData: ExceptionResponse,
		response: any,
	): ExceptionResponse {
		const exceptionResponse = exception?.getResponse();
		if (ExceptionHandler?.isObjectWithErrors(exceptionResponse)) {
			responseData.meta = exceptionResponse?.errors ?? '';
		} else {
			responseData.meta = [response?.errors ?? ''];
		}
		responseData.name = exception?.name;
		responseData.statusCode = exception?.getStatus();
		responseData.message = exception?.message;
		responseData.group = 'HTTP';

		return responseData;
	}

	static handleRSException(
		exception: RSException,
		responseData: ExceptionResponse,
		response: any,
	): ExceptionResponse {
		responseData.meta = [response?.errors ?? ''];
		responseData.message = exception.message;
		responseData.statusCode = exception.httpCode;
		responseData.name = exception.name;
		responseData.group = exception.group;

		return responseData;
	}

	static handleGenericError(
		exception: Error,
		responseData: ExceptionResponse,
	): ExceptionResponse {
		responseData.name = exception?.name;
		responseData.message = exception?.message;

		return responseData;
	}
}
