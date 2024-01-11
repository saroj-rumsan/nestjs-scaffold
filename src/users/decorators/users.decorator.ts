import { UseInterceptors, UsePipes, applyDecorators } from '@nestjs/common';
import { ParseHexStringPipe } from 'src/utils/pipes/parseHexString.pipe';
import { WalletAddressTransformInterceptor } from '../interceptors/walletAddressTransform.interceptor';

export function Users() {
	return applyDecorators(
		UsePipes(ParseHexStringPipe),
		UseInterceptors(WalletAddressTransformInterceptor),
	);
}
