import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NewsMongoService } from '../services/news-mongo.service';

@ApiTags('news-mongo')
@Controller('news-mongo')
export class MongoNewsController {
  constructor(private readonly mongoService: NewsMongoService) {}

  @ApiOperation({ summary: 'Отримати новини та зберегти в MongoDB' })
  @ApiQuery({ name: 'query', required: false, description: 'Тема новин' })
  @ApiQuery({
    name: 'count',
    required: false,
    description: 'Кількість новин (1-10)',
  })
  @Get('fetch')
  async fetchMongo(
    @Query('query') query: string = 'technology',
    @Query('count') count: number = 10,
  ) {
    return this.mongoService.fetchAndSave(query, count);
  }

  @ApiOperation({ summary: 'Пошук новин у MongoDB' })
  @ApiQuery({ name: 'keyword', required: true, description: 'Ключове слово' })
  @Get('search')
  async searchMongo(@Query('keyword') keyword: string) {
    return this.mongoService.search(keyword);
  }
  @ApiOperation({ summary: 'Згенерувати мок-дані новин' })
  @ApiQuery({
    name: 'count',
    required: false,
    type: Number,
    description: 'Кількість новин (default = 10000)',
  })
  @Post('generate-mock')
  async generateMock(@Query('count') count = 10000): Promise<string> {
    return this.mongoService.generateMockNews(Number(count));
  }
}
