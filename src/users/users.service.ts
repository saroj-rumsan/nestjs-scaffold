import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
	constructor(private prisma: PrismaService) {}

	_logger = new Logger(UsersService?.name);

	create(createUserDto: CreateUserDto) {
		this?._logger.log(`Creating new user: ${createUserDto?.email}`);
		return this.prisma.user.create({
			data: createUserDto,
		});
	}

	findAll() {
		this?._logger.log(`Retrieving all users`);
		return this.prisma.user.findMany();
	}

	update(id: string, updateUserDto: UpdateUserDto) {
		return this.prisma.user.update({
			where: { id },
			data: updateUserDto,
		});
	}

	remove(id: string) {
		return this.prisma.user.delete({
			where: { id },
		});
	}
}
