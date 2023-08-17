import {
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { ScrapperService } from './scrapper.service';

@Controller('scrapper')
export class ScrapperController {
  constructor(private readonly scrapperService: ScrapperService) {}

  @Post()
  async scrapIndex() {
    return await this.scrapperService.scrapIndex();
  }
}
