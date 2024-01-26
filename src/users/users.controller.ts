import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, emailAddress } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserByIdPipe } from './pipes/users.pipe';
import { User } from './interfaces/user.interface';
import { Users } from './decorators/users.decorator';
import { Role } from '@prisma/client';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Public } from '../common/decorators/public.decorator';
@Controller('users')
@UseGuards(JwtAuthGuard)
@Users()
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	@ApiResponse({
		status: 201,
		description: 'The record has been successfully created',
		type: CreateUserDto,
	})
	@ApiResponse({
		status: 403,
		description: 'Forbidden.',
	})
	@Public()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	@Public()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', FindUserByIdPipe) user: User): User {
		return user;
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		console.log({ updateUserDto });
		return this.usersService.update(id, updateUserDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(id);
	}

	@Get('role')
	@ApiQuery({ name: 'role', enum: Role, isArray: true })
	async filterByRole(@Query('role') role: Role = Role.USER) {
		return this.usersService.filterByRole(role);
	}

	@Post('email')
	async findUserByEmail(@Body() req: emailAddress) {
		console.log(req);
		return this.usersService.findUserByEmail(req?.email);
	}
}
