import { Controller, Get, UseFilters } from '@nestjs/common';
import { HttpExceptionFilter } from '../utils/filters/httpException.filter';
import { HealthService } from './health.service';
import { HealthResponseDTO } from './dto/healthResponse.dto';

@Controller('dev/health')
@UseFilters(HttpExceptionFilter)
export class HealthController {
	constructor(private readonly healthService: HealthService) {}
	@Get()
	checkHealth(): HealthResponseDTO {
		const response = this.healthService.checkHealth();
		return response;
	}
}
