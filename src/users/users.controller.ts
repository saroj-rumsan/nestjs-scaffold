import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FindUserByIdPipe } from './pipes/users.pipe';
import { User } from './interfaces/user.interface';
import { Users } from './decorators/users.decorator';
import { Role } from '@prisma/client';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';
@Controller('users')
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
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto);
	}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Get(':id')
	findOne(@Param('id', FindUserByIdPipe) user: User): User {
		return user;
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
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
}
