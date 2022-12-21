import { Body, Controller, Get, Headers, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getFaceData(@Req() req: Request, @Headers('content-type') formData: string) {
    console.log('---------', req.header, '-------', req.accepts);
    return this.appService.getFaceData(formData);
  }
}
