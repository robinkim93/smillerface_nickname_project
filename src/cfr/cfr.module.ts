import { Module } from '@nestjs/common';
import { CfrService } from './cfr.service';
import { CfrController } from './cfr.controller';

@Module({
  providers: [CfrService],
  controllers: [CfrController],
})
export class CfrModule {}
