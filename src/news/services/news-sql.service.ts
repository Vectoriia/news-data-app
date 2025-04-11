import { Injectable, Logger } from '@nestjs/common';
import { NewsSqlEntity } from '../entities/news-sql.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import * as dotenv from 'dotenv';
import { randomUUID } from 'crypto';
import { generateRandomTitle } from 'src/utils/get-random-text.util';

dotenv.config();

@Injectable()
export class NewsSqlService {
  constructor(
    @InjectRepository(NewsSqlEntity)
    private readonly newsRepo: Repository<NewsSqlEntity>,
  ) {}
  private readonly logger = new Logger(NewsSqlService.name);
  private readonly API_KEY = process.env.NEWS_API_KEY;
  private readonly API_URL = process.env.NEWS_API_URL;

  async fetchAndSave(query: string, count: number): Promise<any> {
    const response = await axios.get(`${this.API_URL}/latest`, {
      params: {
        apikey: this.API_KEY,
        q: query,
        language: 'en',
        size: count,
      },
    });

    const data = response.data.results;
    const toSave = data.map((item) => this.newsRepo.create({ data: item }));

    await this.newsRepo.save(toSave);
    return data;
  }

  async search(keyword: string): Promise<NewsSqlEntity[]> {
    const start = Date.now();
    const result = await this.newsRepo
      .createQueryBuilder('news')
      .where("news.data->>'title' ILIKE :keyword", {
        keyword: `%${keyword}%`,
      })
      .getMany();
    const end = Date.now();

    this.logger.log(
      `🔍 PostgreSQL search for '${keyword}' took ${end - start} ms`,
    );
    return result;
  }

  async generateMockNews(count = 10000): Promise<string> {
    const newsArray = Array.from({ length: count }).map(() => {
      return {
        data: {
          article_id: randomUUID(),
          title: generateRandomTitle(),
          link: 'https://example.com/news',
          keywords: ['world-news'],
          creator: null,
          video_url: null,
          description: 'This is a mock description',
          content: 'Mock content not available.',
          pubDate: new Date().toISOString(),
          pubDateTZ: 'UTC',
          image_url: 'https://example.com/image.jpg',
          source_id: 'example_source',
          source_priority: Math.floor(Math.random() * 1000),
          source_name: 'Example Source',
          source_url: 'http://example.com',
          source_icon: 'https://example.com/icon.png',
          language: 'english',
          country: ['us'],
          category: ['world'],
          ai_tag: 'mock',
          sentiment: 'neutral',
          sentiment_stats: null,
          ai_region: null,
          ai_org: null,
          duplicate: false,
        },
      };
    });

    const start = Date.now();
    await this.newsRepo.save(newsArray);
    const end = Date.now();

    this.logger.log(
      `📝 PostgreSQL inserting ${count} news took ${end - start} ms`,
    );
    return `${count} news were generated`;
  }
}
