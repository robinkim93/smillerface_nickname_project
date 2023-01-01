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
        'X-Naver-Client-Id': 'fcb0zl9r9nENOW9M1vl_',
        'X-Naver-Client-Secret': 'Rg2a_dNj7B',
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
    data.faces[0].celebrity.value = `${nickName} ${data.faces[0].celebrity.value}`;
    const nickNamePlusCelebrityName = `${nickName} ${celebrityName}`;

    return data;
  }
}
