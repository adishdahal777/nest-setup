import { HttpException, HttpStatus, ArgumentsHost, Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './httpException.filter';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';

describe('HttpExceptionFilter', () => {
	let filter: HttpExceptionFilter;
	let mockJson: jest.Mock;
	let mockStatus: jest.Mock;
	let mockGetResponse: jest.Mock;
	let mockGetRequest: jest.Mock;
	let mockArgumentsHost: ArgumentsHost;
	let mockLoggerError: jest.SpyInstance;

	const mockDate = '2024-01-01T00:00:00.000Z';
	const mockTimestamp = new Date(mockDate);
	const mockRequest = {
		url: '/test-url',
	};

	beforeEach(() => {
		jest.useFakeTimers();
		jest.setSystemTime(mockTimestamp);
		mockJson = jest.fn().mockReturnThis();
		mockStatus = jest.fn().mockReturnThis();
		const mockResponse = {
			status: mockStatus,
			json: mockJson,
		};

		mockGetResponse = jest.fn().mockReturnValue(mockResponse);
		mockGetRequest = jest.fn().mockReturnValue(mockRequest);

		const mockHttpArgumentsHost: HttpArgumentsHost = {
			getRequest: mockGetRequest,
			getResponse: mockGetResponse,
			getNext: jest.fn(),
		};

		mockArgumentsHost = {
			switchToHttp: () => mockHttpArgumentsHost,
			switchToRpc: jest.fn(),
			switchToWs: jest.fn(),
			getType: () => 'http',
			getArgs: () => [],
			getArgByIndex: jest.fn(),
		} as unknown as ArgumentsHost;

		mockLoggerError = jest.spyOn(Logger, 'error').mockImplementation();

		filter = new HttpExceptionFilter();
	});

	afterEach(() => {
		jest.useRealTimers();
		jest.clearAllMocks();
	});

	it('should handle HttpException with proper status code', () => {
		const exception = new HttpException('Test error', HttpStatus.INTERNAL_SERVER_ERROR);

		filter.catch(exception, mockArgumentsHost);

		expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
		expect(mockJson).toHaveBeenCalledWith({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			timestamp: mockDate,
		});
		expect(mockLoggerError).toHaveBeenCalledWith(
			'Exception occured',
			'Test error',
			expect.any(String),
			mockRequest.url,
		);
	});

	it('should handle non-HttpException with 500 status code', () => {
		const errorMessage = 'Test error';
		const error = new Error(errorMessage);
		const exception = error as HttpException;

		filter.catch(exception, mockArgumentsHost);

		expect(mockStatus).toHaveBeenCalledWith(HttpStatus.INTERNAL_SERVER_ERROR);
		expect(mockJson).toHaveBeenCalledWith({
			statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
			timestamp: mockDate,
		});
		expect(mockLoggerError).toHaveBeenCalledWith(
			'Exception occured',
			errorMessage,
			expect.any(String),
			mockRequest.url,
		);
	});

	it('should properly switch to HTTP context', () => {
		const exception = new HttpException('Test error', HttpStatus.BAD_REQUEST);
		const switchToHttpSpy = jest.spyOn(mockArgumentsHost, 'switchToHttp');

		filter.catch(exception, mockArgumentsHost);

		expect(switchToHttpSpy).toHaveBeenCalled();
		expect(mockGetResponse).toHaveBeenCalled();
		expect(mockGetRequest).toHaveBeenCalled();
	});

	it('should log error details correctly', () => {
		const errorMessage = 'Test error message';
		const errorStack = 'Test error stack';
		const exception = new HttpException(errorMessage, HttpStatus.BAD_REQUEST);
		Object.defineProperty(exception, 'stack', { value: errorStack });

		filter.catch(exception, mockArgumentsHost);

		expect(mockLoggerError).toHaveBeenCalledWith('Exception occured', errorMessage, errorStack, mockRequest.url);
	});
});
