import { Injectable } from '@nestjs/common';
import { NewsSqlEntity } from '../entities/news-sql.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class NewsSqlService {
  constructor(
    @InjectRepository(NewsSqlEntity)
    private readonly newsRepo: Repository<NewsSqlEntity>,
  ) {}
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
    return this.newsRepo
      .createQueryBuilder('news')
      .where("news.data->>'title' ILIKE :keyword", { keyword: `%${keyword}%` })
      .getMany();
  }
}
