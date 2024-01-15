import { Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TransformationPipe implements PipeTransform<any> {
	transform(value: any) {
		const defaultValue = {
			id: 12,
		};
		const finalValue = { ...defaultValue, ...value };
		return finalValue;
	}
}
