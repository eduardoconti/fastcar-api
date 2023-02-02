import { Controller, Get } from '@nestjs/common';
import {
  HealthCheck,
  HealthCheckService,
  HttpHealthIndicator,
} from '@nestjs/terminus';

export type HealtCheckOutput = {
  description: string;
  version: string;
  env: string;
};
@Controller('health')
export class HealthCheckController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  handle(): any {
    return this.health.check([
      () => this.http.pingCheck('google', 'http://localhost:3006/app'),
    ]);
  }
}
