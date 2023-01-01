import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { typeORMConfig } from '../ormconfig';
import { NicknameModule } from './nickname/nickname.module';
import { Nicknames } from './nickname/nickname.entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeORMConfig),
    TypeOrmModule.forFeature([Nicknames]),
    MorganModule,
    NicknameModule,
  ],
  controllers: [],
  providers: [
    Logger,
    { provide: APP_INTERCEPTOR, useClass: MorganInterceptor('dev') },
  ],
})
export class AppModule {}
