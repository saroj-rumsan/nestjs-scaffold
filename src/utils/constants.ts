export default {
	port: +process.env.PORT ?? 3500,
	jwt_secret: process.env.JWT_SECRET ?? 'DO NOT USE THIS',
	jwt_expiration_time: +process.env.JWT_EXPIRATION_TIME ?? 900,
	private_key: process.env.PRIVATE_KEY ?? '',
	infura_url: process.env.INFURA_URL ?? '',
};
