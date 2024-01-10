import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
	@IsString()
	readonly name: string;
	@IsString()
	readonly email: string;
	@IsString()
	readonly password: string;
	@IsNumber()
	readonly id: number;
}
