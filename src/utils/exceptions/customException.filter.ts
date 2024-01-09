import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
} from '@nestjs/common';
import { ExceptionResponse } from './interface';
import { ExceptionHandler } from './exception.handler';
import { RSException } from './rs.exception';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
	catch(exception: any, host: ArgumentsHost) {
		const ctx = host?.switchToHttp();
		const response = ctx?.getResponse();
		const request = ctx?.getRequest();

		const responseData: ExceptionResponse = {
			name: 'DEFAULT',
			message:
				'Our server is not happy. It threw an error. Please try again or contact support.' ||
				{},
			success: false,
			statusCode: HttpStatus?.INTERNAL_SERVER_ERROR,
			group: '',
			meta: null,
			path: request?.url,
			timestamp: new Date().getTime(),
		};

		if (exception instanceof HttpException) {
			ExceptionHandler?.handleHttpException(exception, responseData, response);
		} else if (exception instanceof RSException) {
			ExceptionHandler?.handleRSException(exception, responseData, response);
		} else if (exception instanceof Error) {
			ExceptionHandler?.handleGenericError(exception, responseData);
		} else if (typeof exception === 'string') {
			responseData.message = exception;
		}

		console.log({ responseData });

		response.status(responseData?.statusCode).send(responseData);
	}
}
