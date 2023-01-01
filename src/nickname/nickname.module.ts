import { Module } from '@nestjs/common';
import { NicknameService } from './nickname.service';
import { NicknameController } from './nickname.controller';

@Module({
  providers: [NicknameService],
  controllers: [NicknameController],
})
export class NicknameModule {}
