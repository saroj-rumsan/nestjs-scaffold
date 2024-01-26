import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class SiweGuard extends AuthGuard('ethereum') {
	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const response = context.switchToHttp().getRequest();
		console.log({ response });
		return true;
	}
	handleRequest<TUser = any>(err: any, user: any): TUser {
		if (err || !user) {
			throw new Error('Integrate with Ethereum Wallet');
		}
		console.log({ user });
		return user;
	}
}
