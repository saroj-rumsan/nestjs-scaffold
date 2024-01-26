import { UseInterceptors, UsePipes, applyDecorators } from '@nestjs/common';
import { ParseHexStringPipe } from '../../utils/pipes/parseHexString.pipe';
import { WalletAddressTransformInterceptor } from '../interceptors/walletAddressTransform.interceptor';
import { HashPasswordPipe } from '../../auth/pipes/auth.pipe';

export function Users() {
	return applyDecorators(
		UsePipes(ParseHexStringPipe, HashPasswordPipe),
		UseInterceptors(WalletAddressTransformInterceptor),
	);
}
