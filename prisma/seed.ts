import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/utils/string-format';

const prisma = new PrismaClient();

enum Roles {
	Admin = 'ADMIN',
	Moderator = 'MODERATOR',
	User = 'USER',
}

export const users = [
	{
		name: 'Luffy',
		roles: [Roles?.Admin],
		email: 'luffy@mailinator.com',
		password: 'abc123abc',
	},
	{
		name: 'Zoro',
		roles: [Roles?.User],
		email: 'zoro@mailinator.com',
		password: 'abc234abc',
	},
	{
		name: 'Sanji',
		roles: [Roles?.Moderator, Roles?.User],
		email: 'sanji@mailinator.com',
		password: 'abc345abc',
	},
];

const createUser = async (user: any) => {
	const hashedPassword = await hashPassword(user.password);
	const userAttrs = { ...user, password: hashedPassword };
	await prisma.user.create({ data: { ...userAttrs } });
};

const main = async () => {
	try {
		await Promise.all(users.map(createUser));
	} catch (error) {
		console.error(error);
	} finally {
		prisma.$disconnect();
	}
};

main();
