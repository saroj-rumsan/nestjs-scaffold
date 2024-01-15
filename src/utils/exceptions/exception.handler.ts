import { HttpException, Logger } from '@nestjs/common';
import { ExceptionResponse } from '../interface';
import { RSException } from './rs.exception';
import { Prisma } from '@prisma/client';

export class ExceptionHandler {
	static logger = new Logger(ExceptionHandler?.name);
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

		this.logger.error(responseData?.message);

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

		this.logger.error(responseData?.message);

		return responseData;
	}

	static handlePrismaException(
		exception: Prisma.PrismaClientKnownRequestError,
		responseData: ExceptionResponse,
	): ExceptionResponse {
		const prismaError = this?.PrimsaFriendlyErrorMessage(exception);

		responseData.name = exception?.name;
		responseData.message = prismaError?.message;
		responseData.statusCode = prismaError?.httpCode;
		responseData.group = 'DBERROR';

		this?.logger.error(responseData?.message);

		return responseData;
	}

	static handleGenericError(
		exception: Error,
		responseData: ExceptionResponse,
	): ExceptionResponse {
		responseData.name = exception?.name;
		responseData.message = exception?.message;
		responseData.group = 'General Error';

		this.logger.error(responseData?.message);

		return responseData;
	}

	static PrimsaFriendlyErrorMessage(
		exception: Prisma.PrismaClientKnownRequestError,
	) {
		let message = exception.message || 'Error occured';
		let httpCode = 500;

		if (exception.code === 'P2002') {
			const field = (<[]>exception.meta.target).join('.');
			message = `Duplicate entry in [${field}] is not allowed.`;
		} else if (exception.code === 'P2025') {
			httpCode = 404;
		} else {
			message = message
				.substring(message.indexOf('→'))
				.substring(message.indexOf('\n'))
				.replace(/\n/g, '')
				.trim();
		}
		return { message, httpCode };
	}
}
