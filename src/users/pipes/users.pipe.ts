import { Injectable, PipeTransform } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindUserByIdPipe implements PipeTransform {
	constructor(private readonly prisma: PrismaService) {}
	transform(value: any) {
		if (value && typeof value === 'string') {
			return this.prisma.user.findUnique({
				where: { id: value },
			});
		}
	}
}
