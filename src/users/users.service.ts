import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from '@prisma/client';
import { User } from './interfaces/user.interface';

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

	async findUserByEmail(email: string): Promise<User> {
		if (email) {
			return this.prisma.user.findUnique({
				where: { email },
			});
		}
		throw new NotFoundException('User Not Found');
	}

	async filterByRole(role: Role) {
		return role;
	}
	async findUserByAddress(address: any): Promise<User> {
		if (address) {
			return this.prisma.user.findUnique({
				where: { walletAddress: address },
			});
		}
		throw new NotFoundException('User Not Found');
	}
}
