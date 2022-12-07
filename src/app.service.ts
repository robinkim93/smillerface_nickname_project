import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { map, firstValueFrom, lastValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService) {}
  get() {
    return '졸지~';
  }

  async getFaceData(formData: string) {
    const headersRequest = {
      headers: {
        'X-Naver-Client-Id': 'fcb0zl9r9nENOW9M1vl_',
        'X-Naver-Client-Secret': 'Rg2a_dNj7B',
      },
    };

    // const data = await lastValueFrom(
    //   this.httpService
    //     .post('https://openapi.naver.com/v1/vision/celebrity', {
    //       headers: headersRequest,
    //     })
    //     .pipe(map((res) => res.data)),
    // ).catch((err) => console.log(err));
    // console.log(formData);
    axios.defaults.headers.post['X-Naver-Client-Id'] = 'fcb0zl9r9nENOW9M1vl_';
    axios.defaults.headers.post['X-Naver-Client-Secret'] = 'Rg2a_dNj7B';

    const data = await axios
      .post('https://openapi.naver.com/v1/vision/celebrity', { body: formData })
      .catch((err) => console.error(err));

    return data;
  }
}
