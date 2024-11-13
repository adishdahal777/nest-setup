import { ExceptionFilter, Catch, ArgumentsHost, HttpException, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
	catch(exception: HttpException, host: ArgumentsHost): void {
		const ctx = host.switchToHttp();
		const response = ctx.getResponse<Response>();
		const request = ctx.getRequest<Request>();
		const status: number = HttpStatus.INTERNAL_SERVER_ERROR;

		Logger.error('Exception occured', exception.message, exception.stack, request.url);

		response.status(status).json({
			statusCode: status,
			timestamp: new Date().toISOString(),
		});
	}
}
