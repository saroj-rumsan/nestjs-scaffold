import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
	handleRequest<TUser = any>(err: any, user: any): TUser {
		if (err || !user) {
			throw new UnauthorizedException('Email or Password Incorrect.');
		}
		return user;
	}
}
