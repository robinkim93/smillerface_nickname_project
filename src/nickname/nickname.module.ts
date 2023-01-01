import { Module } from '@nestjs/common';
import { NicknameService } from './nickname.service';
import { NicknameController } from './nickname.controller';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Nicknames } from './nickname.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Nicknames]), HttpModule, ConfigModule],
  providers: [NicknameService],
  controllers: [NicknameController],
})
export class NicknameModule {}
