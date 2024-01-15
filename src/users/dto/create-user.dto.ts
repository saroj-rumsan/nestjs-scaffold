import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateUserDto {
	@IsString()
	email: string;
	@IsString()
	name: string;
	@IsOptional()
	walletAddress: Buffer;
	@IsArray()
	@IsOptional()
	roles: [];
}
