import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { INestApplication, Logger, VersioningType } from '@nestjs/common';
import CONSTANTS from 'src/utils/constants';

async function bootstrap() {
	const _logger = new Logger(NestApplication?.name);
	const app: INestApplication = await NestFactory.create<NestFastifyApplication>(
		AppModule,
		new FastifyAdapter({ logger: false }),
	);
	app.enableCors();
	app.setGlobalPrefix('api').enableVersioning({ type: VersioningType?.URI, defaultVersion: '1' });
	await app.listen(CONSTANTS?.port, 'localhost', () => {
		_logger.log(`Application Listening in port ${CONSTANTS?.port}`);
	});
}
bootstrap();
