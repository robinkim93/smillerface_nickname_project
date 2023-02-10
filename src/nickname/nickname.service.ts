import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as FormData from 'form-data';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom, map } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Nicknames } from './nickname.entities';
import { NicknameDto } from './nickname.dto';

@Injectable()
export class NicknameService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    @InjectRepository(Nicknames)
    private readonly nicknameRepository: Repository<Nicknames>,
  ) {}

  private readonly URL: string = this.configService.get('NAVER_URL');
  private readonly API_KEY = {
    'X-Naver-Client-Id': this.configService.get('SECRET_ID'),
    'X-Naver-Client-Secret': this.configService.get('SECRET_KEY'),
  };

  async getFaceData(image) {
    const formData = new FormData();

    const buffer: string = image.buffer;

    const filename: string = image.originalname;

    formData.append('image', buffer, filename);

    const config = {
      headers: {
        'X-Naver-Client-Id': this.API_KEY['X-Naver-Client-Id'],
        'X-Naver-Client-Secret': this.API_KEY['X-Naver-Client-Secret'],
        'content-type': 'multipart/form-data',
      },
    };

    const data: NicknameDto = await lastValueFrom(
      this.httpService
        .post('https://openapi.naver.com/v1/vision/celebrity', formData, config)
        .pipe(map((res) => res.data)),
    ).catch((err) => console.log(err));

    const nickNameData = await this.nicknameRepository
      .createQueryBuilder()
      .select()
      .orderBy('RAND()')
      .getOne();

    const nickName = nickNameData.nickname;
    const celebrityName = data.faces[0].celebrity.value;

    data.faces[0].celebrity.value = `${nickName} ${celebrityName}`;

    return data;
  }
}
