import {
	ArgumentMetadata,
	BadRequestException,
	PipeTransform,
} from '@nestjs/common';
import { hashPassword } from '../../utils/string-format';
export class FindUserById implements PipeTransform {
	transform(value: any) {
		if (value && typeof value === 'string') {
			return {
				name: `Saroj Shrestha`,
				email: `test@mailinator.com`,
				password: 'abc',
				id: +value,
			};
		}
	}
}

export class HashPasswordPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (metadata && metadata.type === 'body') {
			return this.hashPassword(value);
		}
		console.log(typeof value);
		return value;
	}

	private async hashPassword(value: any) {
		const propertyName = 'password';
		if (
			!value ||
			!value[propertyName] ||
			typeof value[propertyName] !== 'string'
		) {
			return value;
		}
		try {
			value[propertyName] = await hashPassword(value[propertyName]);
			return value;
		} catch (error) {
			throw new BadRequestException(`Invalid string for ${propertyName}`);
		}
	}
}
