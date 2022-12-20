import { HttpService } from '@nestjs/axios';
import { Injectable, Headers } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { map, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import * as fs from 'fs';
import path from 'path';

@Injectable()
export class AppService {
  private readonly URL: string =
    'https://openapi.naver.com/v1/vision/celebrity';
  private readonly API_KEY = {
    'X-Naver-Client-Id': 'fcb0zl9r9nENOW9M1vl_',
    'X-Naver-Client-Secret': 'Rg2a_dNj7B',
  };

  constructor(private readonly httpService: HttpService) {}

  async getFaceData(formData: string) {
    const foorm = new FormData();

    const form = {
      image: './KakaoTalk_20220418_213157029.jpg',
    };

    const config = {
      headers: { ...this.API_KEY, 'content-type': 'multipart/form-data' },
    };

    const data = await lastValueFrom(
      this.httpService
        .post(this.URL, form, config)
        .pipe(map((res) => res.data)),
    ).catch((err) => console.log(err));

    // console.log(data);
    return data;
  }
}
