import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  get() {
    return this.appService.get();
  }

  @Post()
  getFaceData(@Req() req: Request, @Body() formData: string) {
    console.log(req);
    return this.appService.getFaceData(formData);
  }
}
