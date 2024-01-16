import { INestApplication, Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication, port: number) {
	const _logger = new Logger(setupSwagger?.name);
	const config = new DocumentBuilder()
		.setTitle(`SCAFFOLD API PROVIDER `)
		.setDescription('SCAFFOLD')
		.setVersion('1.0.0')
		.addTag('SCAFFOLD')
		.build();
	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('/api/docs', app, document);
	_logger.log(
		`Swagger Documentation running on the url http://localhost:${port}/api/docs`,
	);
}
