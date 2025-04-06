import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NewsMongo, NewsMongoDocument } from '../entities/news-mongo.schema';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class NewsMongoService {
  constructor(
    @InjectModel(NewsMongo.name)
    private readonly newsModel: Model<NewsMongoDocument>,
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
    const mapped = data.map((item) => ({ ...item, id: item.article_id }));

    await this.newsModel.insertMany(mapped);

    return data;
  }

  async search(keyword: string): Promise<NewsMongo[]> {
    return this.newsModel.find({
      title: { $regex: keyword, $options: 'i' },
    });
  }
}
