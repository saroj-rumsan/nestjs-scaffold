import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/user.interface';

@Injectable()
export class WalletAddressTransformInterceptor<T>
	implements NestInterceptor<T, Response<T>>
{
	intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Observable<Response<T>> | Promise<Observable<Response<T>>> {
		return next.handle().pipe(map((data) => this.transformWalletAddress(data)));
	}

	private transformWalletAddress(data: any): any {
		if (Array.isArray(data)) {
			return data?.map((item) => this.transformWalletAddressItem(item));
		}
		return this.transformWalletAddressItem(data);
	}

	private transformWalletAddressItem(item: any) {
		if (this.isBuffer(item?.walletAddress)) {
			item.walletAddress = item?.walletAddress?.toString('hex');
		}
		return item;
	}

	private isBuffer(value: any): value is Buffer {
		return Buffer.isBuffer(value);
	}
}
