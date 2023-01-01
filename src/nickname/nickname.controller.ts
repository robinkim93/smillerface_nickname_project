import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NicknameService } from './nickname.service';

@Controller()
export class NicknameController {
  constructor(private readonly nicknameService: NicknameService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  getFaceData(@UploadedFile() image: Express.Multer.File) {
    return this.nicknameService.getFaceData(image);
  }
}
