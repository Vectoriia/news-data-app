import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NewsService } from './news.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @ApiOperation({ summary: 'Отримати новини' })
  @ApiQuery({ name: 'query', required: false, description: 'Тема новин' })
  @ApiQuery({ name: 'count', required: false, description: 'Кількість новин' })
  @Get('fetch')
  async getNews(
    @Query('query') query: string = 'technology',
    @Query('count') count: number = 10,
  ) {
    return this.newsService.fetchNews(query, count);
  }

  @ApiOperation({ summary: 'Пошук новин' })
  @ApiQuery({ name: 'keyword', required: true, description: 'Ключове слово' })
  @Get('search')
  async search(@Query('keyword') keyword: string) {
    return this.newsService.searchNews(keyword);
  }

  @ApiOperation({ summary: 'Останні новини' })
  @Get('latest')
  async latestNews() {
    return this.newsService.lastNews();
  }
}
