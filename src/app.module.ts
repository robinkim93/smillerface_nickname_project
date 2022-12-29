import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { MorganInterceptor, MorganModule } from 'nest-morgan';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { typeORMConfig } from '../ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRootAsync(typeORMConfig),
    HttpModule,
    MorganModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    { provide: APP_INTERCEPTOR, useClass: MorganInterceptor('dev') },
  ],
})
export class AppModule {}
