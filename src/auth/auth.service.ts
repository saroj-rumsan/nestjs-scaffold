import { Injectable, Logger } from '@nestjs/common';
import { User } from './types';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}
	private readonly _logger = new Logger(AuthService?.name);

	private readonly users: User[] = [];

	async validateUser(email: string, pass: string): Promise<any> {
		const user = await this.usersService.findUserByEmail(email);
		if (user && user.password === pass) {
			delete user.password;
			return user;
		}
		return null;
	}

	async login(user: any) {
		const payload = { email: user.email, password: user.password };
		return {
			access_token: this.jwtService.sign(payload),
		};
	}

	create(user: User) {
		this._logger.log(`User Created Successfully`);
		this.users.push(user);
	}

	findAll(): User[] {
		this._logger.log(`User Fetched Successfully`);
		return this.users;
	}

	async verifyUserByAddress(address) {
		const user = this.usersService.findUserByAddress(address);
		if (user) {
			delete (await user).password;
			return user;
		}
		return null;
	}
}
