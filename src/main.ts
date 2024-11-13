import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder, OpenAPIObject } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
	const app = await NestFactory.create(AppModule);

	const config = new DocumentBuilder()
		.setTitle('Nest Setup')
		.setDescription('Nest Setup API description')
		.setVersion('1.0')
		.addTag('Nest Setup')
		.build();
	const documentFactory = (): OpenAPIObject => {
		return SwaggerModule.createDocument(app, config);
	};
	SwaggerModule.setup('/dev/swagger/api', app, documentFactory);

	await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
