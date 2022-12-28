import { HttpService } from '@nestjs/axios';
import { Injectable, Headers, Body } from '@nestjs/common';
import axios, { Axios, AxiosResponse, toFormData } from 'axios';
import { map, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import * as fs from 'fs';
import path from 'path';
import { Blob } from 'buffer';
import { Binary } from 'typeorm';
import * as FormData from 'form-data';

@Injectable()
export class AppService {
  private readonly URL: string =
    'https://openapi.naver.com/v1/vision/celebrity';
  private readonly API_KEY = {
    'X-Naver-Client-Id': 'fcb0zl9r9nENOW9M1vl_',
    'X-Naver-Client-Secret': 'Rg2a_dNj7B',
  };

  constructor(private readonly httpService: HttpService) {}

  async getFaceData(buffer: string | Blob, original: string) {
    const formData = new FormData();

    formData.append('image', buffer, original);

    console.log(typeof formData);

    const config = {
      headers: {
        ...this.API_KEY,
        'content-type': 'multipart/form-data',
      },
    };

    const data = await axios
      .post(this.URL, formData.getHeaders(), config)
      .then((res) => console.log(res));
    // .catch((err) => console.log(err));

    return data;
  }
}
