import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
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

  async getFaceData(image) {
    const formData = new FormData();
    const buffer: string = image.buffer;
    const filename: string = image.originalname;

    formData.append('image', buffer, filename);

    const config = {
      headers: {
        ...this.API_KEY,
        'content-type': 'multipart/form-data',
      },
    };

    const data = await axios
      .post(this.URL, formData, config)
      .then((res) => res.data)
      .catch((err) => console.log(err));
    return data;
  }
}
