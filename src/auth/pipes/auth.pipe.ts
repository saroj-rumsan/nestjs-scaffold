import { PipeTransform } from '@nestjs/common';

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
