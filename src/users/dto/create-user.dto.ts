import { ApiProperty } from '@nestjs/swagger';
import {
	IsArray,
	IsEthereumAddress,
	IsOptional,
	IsString,
} from 'class-validator';

export enum ROLE {
	Admin = 'ADMIN',
	Moderator = 'MODERATOR',
	User = 'USER',
}

export class CreateUserDto {
	@ApiProperty({
		description: `Example of Email`,
		example: 'test@test.com',
		type: String,
	})
	@IsString()
	email: string;

	@ApiProperty({
		description: `Example of Password`,
		example: '*******',
		type: String,
	})
	@IsString()
	password: string;
	@ApiProperty({
		description: `Full name of the user`,
		example: `Lorem Poseidon`,
	})
	@IsString()
	name: string;
	@ApiProperty({
		description: `Password for the user`,
	})
	@IsOptional()
	@IsEthereumAddress()
	@ApiProperty({
		description: 'Example of wallet Address',
		example: '0x96Db70BD98095E817826977f4400c976A8634D00',
	})
	walletAddress: Buffer;

	@ApiProperty({
		description: `Array of the roles of user`,
		enum: ROLE,
		type: [String],
	})
	@IsArray()
	@IsOptional()
	roles: [];
}

export interface emailAddress {
	email: string;
}
