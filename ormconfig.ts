import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { Nicknames } from 'src/app.entities';
import { DataSource } from 'typeorm';

export const typeORMConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => ({
    type: 'mariadb',
    url: configService.get('DB_URL'),
    host: configService.get('DB_HOST'),
    password: configService.get('DB_PASSWORD'),
    entities: [Nicknames],
    synchronize: false,
  }),
  dataSourceFactory: async (options) => {
    const dataSource = await new DataSource(options).initialize();
    return dataSource;
  },
};
