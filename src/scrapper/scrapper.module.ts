import { Module } from '@nestjs/common';
import { ScrapperService } from './scrapper.service';
import { ScrapperController } from './scrapper.controller';

@Module({
  imports: [],
  controllers: [ScrapperController],
  providers: [ScrapperService],
})
export class ScrapperModule {}
