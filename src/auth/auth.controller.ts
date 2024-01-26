import {
	Body,
	Controller,
	Get,
	Headers,
	HttpCode,
	HttpStatus,
	Param,
	ParseBoolPipe,
	ParseFloatPipe,
	Post,
	Query,
	Request,
	UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { Find, User } from './types';
import { AuthService } from './auth.service';
import { ERRORS } from '../utils/exceptions/rs.exception';
import { ValidationPipe } from '../utils/pipes/validation.pipe';
import { TransformationPipe } from '../utils/pipes/transformation.pipe';
import { FindUserById } from './pipes/auth.pipe';
import { Auth } from './decorators/auth.decorator';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { SiweGuard } from './guards/siwe.guard';
@Controller('auth')
export class AuthController {
	constructor(private authsService: AuthService) {}

	@Post('validate')
	@UseGuards(LocalAuthGuard)
	async validateUser(@Request() req) {
		return req.user;
	}

	@Post('login')
	@UseGuards(LocalAuthGuard)
	async login(@Request() req: any) {
		return this.authsService.login(req.user);
	}

	@Post('login/wallet')
	@UseGuards(SiweGuard)
	async walletLogin(@Request() req: any) {
		return this.authsService.walletLogin(req.user);
	}

	@Post()
	@Auth(['admin'])
	// @UseInterceptors(TransformInterceptor)
	create(@Body(TransformationPipe) data: CreateUserDto): CreateUserDto {
		this.authsService.create(data);
		return data;
	}

	@Get(':id')
	async findOne(@Param('id', FindUserById) user: User): Promise<User> {
		return user;
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

	// @Get(':id')
	// async getById(@Param('id', ParseIntPipe) id: any) {
	// 	if (id > 5) {
	// 		return typeof id;
	// 	}
	// 	throw new BadRequestException();
	// }

	@Get('name')
	async getByName(
		@Query(
			'name',
			new ParseFloatPipe({ errorHttpStatusCode: HttpStatus?.NOT_ACCEPTABLE }),
		)
		name: string,
	) {
		return typeof name;
	}

	@Get('hello')
	async getFromQuery(@Query('id', ValidationPipe) id: number) {
		return id;
	}

	@Post('bool')
	async getBoolValue(@Body('status', ParseBoolPipe) status: boolean) {
		return typeof status;
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

	@Get('test')
	testCont() {
		return this.authsService.testService();
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
