import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

enum Roles {
	Admin = 'ADMIN',
	Moderator = 'MODERATOR',
	User = 'USER',
}

export const users = [
	{ name: 'Luffy', roles: [Roles?.Admin], email: 'luffy@mailinatorcom' },
	{ name: 'Zoro', roles: [Roles?.User], email: 'zoro@mailinator.com' },
	{
		name: 'Sanji',
		roles: [Roles?.Moderator, Roles?.User],
		email: 'sanji@mailinator.com',
	},
];

const createUser = async (user: any) => {
	const userAttrs = { ...user };
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
