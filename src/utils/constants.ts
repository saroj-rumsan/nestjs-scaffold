export default {
	port: +process.env.PORT ?? 3500,
	jwt_secret: process.env.JWT_SECRET ?? 'JWT SECRET',
	jwt_expiration_time: +process.env.JWT_EXPIRATION_TIME ?? 900,
};
