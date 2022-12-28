import {
  Body,
  Controller,
  Get,
  Headers,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Request } from 'express';
import { AppService } from './app.service';
import { Any, DataSource } from 'typeorm';
import { Blob } from 'buffer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  getFaceData(
    @Req() req,
    @Headers('content-type') formData: string,
    @Body() body,
    @UploadedFile() file: Express.Multer.File,
  ) {
    // console.log(req);
    return this.appService.getFaceData(formData);
  }
}
