import { Module } from '@nestjs/common';
import { HealthController } from './health/health.controller';
import { HealthService } from './health/health.service';
import { HealthModule } from './health/health.module';

@Module({
	imports: [HealthModule],
	controllers: [HealthController],
	providers: [HealthService],
})
export class AppModule {}
