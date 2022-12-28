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
  getFaceData(@Req() req, @UploadedFile() image: Express.Multer.File) {
    const buffer = image.buffer.toString();
    const original = image.originalname;
    const file = req.file;
    // console.log(typeof req.file);

    // console.log(image);
    return this.appService.getFaceData(file, image);
  }
}
