import { Controller, Get } from '@nestjs/common';

export type HealtCheckOutput = {
  description: string;
  version: string;
  env: string;
};
@Controller('health')
export class HealthCheckController {
  @Get()
  handle(): HealtCheckOutput {
    return {
      description: 'Fastcar',
      version: '1.0.0',
      env: process.env.NODE_ENV as string,
    };
  }
}
