import {
	ArgumentMetadata,
	BadRequestException,
	Injectable,
	PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseHexStringPipe implements PipeTransform {
	transform(value: any, metadata: ArgumentMetadata) {
		if (metadata && metadata.type === 'body') {
			return this?.transformWalletAddress(value);
		}
		return value;
	}

	private async transformWalletAddress(value: any) {
		const propertyName = 'walletAddress';
		if (
			!value ||
			!value[propertyName] ||
			typeof value[propertyName] !== 'string'
		) {
			return value;
		}
		try {
			value[propertyName] = Buffer.from(
				value[propertyName].substring(2),
				'hex',
			);
			return value;
		} catch (error) {
			throw new BadRequestException(`Invalid hex string for ${propertyName}`);
		}
	}
}
