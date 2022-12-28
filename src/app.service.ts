import { HttpService } from '@nestjs/axios';
import { Injectable, Headers, Body } from '@nestjs/common';
import axios, { Axios, AxiosResponse, toFormData } from 'axios';
import { map, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import * as fs from 'fs';
import path from 'path';
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

  async getFaceData(file, image) {
    const formData = new FormData();
    const buffer: string = image.buffer;
    const filename: string = image.originalname;
    formData.append('image', buffer, filename);
    // console.log(formData);
    const config = {
      headers: {
        ...this.API_KEY,
        'content-type': 'multipart/form-data',
      },
    };
    // const data = await lastValueFrom(
    //   this.httpService
    //     .post(this.URL, formData, config)
    //     .pipe(map((res) => res.data)),
    // )
    //   .then((res) => JSON.stringify(res))
    //   .catch((err) => console.log(err));

    const data = await axios
      .post(this.URL, formData, config)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return data;
  }
}
