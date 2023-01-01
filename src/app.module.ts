import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { typeORMConfig } from '../ormconfig';
import { ConfigModule } from '@nestjs/config';
import { NicknameModule } from './nickname/nickname.module';
import { Nicknames } from './nickname/nickname.entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeORMConfig),
    TypeOrmModule.forFeature([Nicknames]),
    HttpModule,
    MorganModule,
    ConfigModule,
    NicknameModule,
  ],
  controllers: [],
  providers: [
    Logger,
    { provide: APP_INTERCEPTOR, useClass: MorganInterceptor('dev') },
  ],
})
export class AppModule {}
