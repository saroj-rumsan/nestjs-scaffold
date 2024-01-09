import {
	Body,
	Controller,
	Get,
	Headers,
	HttpCode,
	Param,
	Post,
	Query,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Find, User } from './types';
import { AuthService } from './auth.service';
import { ERRORS } from 'src/utils/exceptions/rs.exception';

@Controller('auth')
export class AuthController {
	constructor(private authsService: AuthService) {}

	@Post()
	create(@Body() data: CreateUserDto): void {
		this.authsService.create(data);
	}

	@Get()
	async findAll(): Promise<User[]> {
		return this.authsService.findAll();
	}

	@Get('find')
	@HttpCode(204)
	findAlls(@Query('hello') hello: Record<string, string>): void {
		console.log({ hello });
	}

	@Get('fin')
	find(
		@Param() id: number,
		@Body() body: Find,
		@Query() address: string,
		@Headers() token: string,
	) {
		console.log({ id, body, address, token });
	}

	@Get('error')
	error() {
		// throw new Error('This is an Error');
		// throw new BadRequestException('This is bad Request', {
		// 	cause: new Error(),
		// 	description: `The Request is Faulty`,
		// });
		throw ERRORS?.NOT_JSON;
	}
}
