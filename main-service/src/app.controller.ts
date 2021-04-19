import { Controller, Get } from '@nestjs/common';

@Controller('health')
export class AppController {
  @Get()
  health(): any {
    return { msg: `System's up` };
  }
}
