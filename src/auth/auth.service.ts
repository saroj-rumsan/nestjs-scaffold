import { Injectable, Logger } from '@nestjs/common';
import { User } from './types';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { comparePassword } from '../utils/string-format';

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
		const isUser = await comparePassword(pass, user.password);
		if (isUser) {
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

	async walletLogin(user: any) {
		return user;
	}

	create(user: User) {
		this._logger.log(`User Created Successfully`);
		this.users.push(user);
	}

	findAll(): User[] {
		this._logger.log(`User Fetched Successfully`);
		return this.users;
	}

	testService(): string {
		return 'hello World';
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
