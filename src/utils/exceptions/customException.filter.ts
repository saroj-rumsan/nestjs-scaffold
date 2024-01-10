import {
	ArgumentMetadata,
	ArgumentsHost,
	BadRequestException,
	Catch,
	ExceptionFilter,
	HttpException,
	HttpStatus,
	PipeTransform,
} from '@nestjs/common';
import { ExceptionResponse } from '../interface';
import { ExceptionHandler } from './exception.handler';
import { RSException } from './rs.exception';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Catch()
export class CustomExceptionFilter
	implements PipeTransform<any>, ExceptionFilter
{
	async transform(value: string, { metatype }: ArgumentMetadata) {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}

		const object = plainToInstance(metatype, value);
		const error = await validate(object);
		if (error?.length > 0) {
			const messages = this.getErrorMessage(error);

			throw new BadRequestException({
				message: 'Validation Failed',
				errors: messages,
				status: 400,
			});
		}
		return value;
	}

	private toValidate(metatype: any): boolean {
		const types = [String, Boolean, Number, Array, Object];
		return !types?.includes(metatype);
	}

	private getErrorMessage(errors: any): Record<string, any> {
		const result: Record<string, any> = {};
		errors?.forEach((error: any) => {
			const constraints = error?.constraints;
			if (constraints) {
				const property = error?.property;
				result[property] = Object.values(constraints);
			}
		});
		return result;
	}

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

		response.status(responseData?.statusCode).send(responseData);
	}
}
