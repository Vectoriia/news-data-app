import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NewsService } from '../services/news.service';
import { NewsSqlService } from '../services/news-sql.service';
import { NewsMongoService } from '../services/news-mongo.service';

@ApiTags('news')
@Controller('news')
export class NewsController {
  constructor(
    private readonly newsService: NewsService,
    private readonly sqlService: NewsSqlService,
    private readonly mongoService: NewsMongoService,
  ) {}

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

  @ApiOperation({ summary: 'Отримати новини та зберегти в MongoDB' })
  @ApiQuery({ name: 'query', required: false, description: 'Тема новин' })
  @ApiQuery({
    name: 'count',
    required: false,
    description: 'Кількість новин (1-10)',
  })
  @Get('fetch/mongo')
  async fetchMongo(
    @Query('query') query: string = 'technology',
    @Query('count') count: number = 10,
  ) {
    return this.mongoService.fetchAndSave(query, count);
  }

  @ApiOperation({ summary: 'Отримати новини та зберегти в PostgreSQL' })
  @ApiQuery({ name: 'query', required: false, description: 'Тема новин' })
  @ApiQuery({
    name: 'count',
    required: false,
    description: 'Кількість новин (1-10)',
  })
  @Get('fetch/sql')
  async fetchSql(
    @Query('query') query: string = 'technology',
    @Query('count') count: number = 10,
  ) {
    return this.sqlService.fetchAndSave(query, count);
  }

  @ApiOperation({ summary: 'Пошук новин у MongoDB' })
  @ApiQuery({ name: 'keyword', required: true, description: 'Ключове слово' })
  @Get('search/mongo')
  async searchMongo(@Query('keyword') keyword: string) {
    return this.mongoService.search(keyword);
  }

  @ApiOperation({ summary: 'Пошук новин у PostgreSQL' })
  @ApiQuery({ name: 'keyword', required: true, description: 'Ключове слово' })
  @Get('search/sql')
  async searchSql(@Query('keyword') keyword: string) {
    return this.sqlService.search(keyword);
  }
}
