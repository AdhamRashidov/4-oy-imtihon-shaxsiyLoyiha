import { NestFactory } from "@nestjs/core";
import cookieParser from 'cookie-parser';
import { AppModule } from "./app.module";
import { AllExceptionFilter } from "src/infrastructure/exception/AllException";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { config } from "src/config";

export class Application {
	static async main(): Promise<void> {

		const PORT = config.API_PORT;

		const app = await NestFactory.create(AppModule);

		app.useGlobalFilters(new AllExceptionFilter());

		app.useGlobalPipes(
			new ValidationPipe({
				whitelist: true,
				forbidNonWhitelisted: true,
				transform: true,
				errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
			}),
		);

		app.use(cookieParser());

		const api = 'api/v1';
		app.setGlobalPrefix(api);
		const configSwagger = new DocumentBuilder()
			.setTitle('exam_4_month')
			.setVersion('0.0.1')
			.addBearerAuth({
				type: 'http',
				scheme: 'Bearer',
				in: 'Header',
			})
			.build();
		const documentFactory = SwaggerModule.createDocument(app, configSwagger);
		SwaggerModule.setup(api, app, documentFactory);

		app.listen(PORT, () => console.log('Server running on port', PORT));

		process.on('uncaughtException', (err) => {
			console.error('Uncaught Exception:', err);
		});

		process.on('unhandledRejection', (reason, promise) => {
			console.error('Unhandled Rejection at:', promise, 'reason:', reason);
		});
	}
}
