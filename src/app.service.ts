import { HttpService } from '@nestjs/axios';
import { Injectable, Headers } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { map, firstValueFrom, lastValueFrom, Observable } from 'rxjs';
import * as fs from 'fs';
import path from 'path';
import { Blob } from 'buffer';

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
    // const image = './KakaoTalk_20220418_213157029.jpg';
    const foorm = new FormData();
    foorm.append(
      'image',
      //@ts-ignore
      fs.createReadStream('src/KakaoTalk_20220418_213157029.jpg'),
    );
    // console.log(foorm);
    const config = {
      headers: {
        ...this.API_KEY,
        'content-type': 'multipart/form-data',
      },
    };

    const mmm = {
      // image,
    };

    const option = {
      method: 'post',
      url: this.URL,
      headers: {
        ...this.API_KEY,
        // 'content-type': 'multipart/form-data',
      },
      data: foorm,
    };
    console.log(foorm);
    const data = await axios(option)
      .then((res) => console.log(JSON.stringify(res.data)))
      .catch((err) => console.log(err));
    // console.log(data);

    // const data = await axios
    //   .post(this.URL, null, config)
    //   .then((res) => console.log(res))
    //   .catch((err) => console.log(err));

    // const data = await lastValueFrom(
    //   this.httpService
    //     .post(this.URL, foorm, config)
    //     .pipe(map((res) => res.data)),
    // ).catch((err) => console.log(err));

    return data;
  }
}
