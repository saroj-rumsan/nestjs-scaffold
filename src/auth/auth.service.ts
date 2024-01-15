import { Injectable, Logger } from '@nestjs/common';
import { User } from './types';

@Injectable()
export class AuthService {
	private readonly _logger = new Logger(AuthService?.name);

	private readonly users: User[] = [];

	create(user: User) {
		this._logger.log(`User Created Successfully`);
		this.users.push(user);
	}

	findAll(): User[] {
		this._logger.log(`User Fetched Successfully`);
		return this.users;
	}
}
