import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-ethereum-siwe';
import { AuthService } from '../auth.service';
@Injectable()
export class SiweStrategy extends PassportStrategy(Strategy) {
	constructor(private authService: AuthService) {
		super({
			passReqToCallback: true,
		});
	}

	async validate(_req: any, address: string) {
		console.log({ address });
		const user = await this.authService.verifyUserByAddress(address);
		if (!user) {
			throw new UnauthorizedException();
		}
		return user;
	}
}
