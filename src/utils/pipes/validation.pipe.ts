import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
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
}
