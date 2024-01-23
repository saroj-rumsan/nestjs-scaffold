export interface User {
	id: string;
	name: string;
	email: string;
	password: string;
	walletAddress: Buffer | string;
	profileImage: string;
	roles: string[];
	isActive: boolean;
	isBlocked: boolean;
	lastLoggedIn: Date;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;
}

export interface Response<T> {
	data: T;
}
