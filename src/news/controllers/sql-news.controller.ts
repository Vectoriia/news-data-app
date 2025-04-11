import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { NewsSqlService } from '../services/news-sql.service';

@ApiTags('news-sql')
@Controller('news-sql')
export class SqlNewsController {
  constructor(private readonly sqlService: NewsSqlService) {}
  @ApiOperation({ summary: 'Отримати новини та зберегти в PostgreSQL' })
  @ApiQuery({ name: 'query', required: false, description: 'Тема новин' })
  @ApiQuery({
    name: 'count',
    required: false,
    description: 'Кількість новин (1-10)',
  })
  @Get('fetch')
  async fetchSql(
    @Query('query') query: string = 'technology',
    @Query('count') count: number = 10,
  ) {
    return this.sqlService.fetchAndSave(query, count);
  }

  @ApiOperation({ summary: 'Пошук новин у PostgreSQL' })
  @ApiQuery({ name: 'keyword', required: true, description: 'Ключове слово' })
  @Get('search')
  async searchSql(@Query('keyword') keyword: string) {
    return this.sqlService.search(keyword);
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
    return this.sqlService.generateMockNews(Number(count));
  }
}
