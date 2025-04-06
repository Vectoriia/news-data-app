import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs-extra';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class NewsService {
  private readonly API_KEY = process.env.NEWS_API_KEY;
  private readonly API_URL = process.env.NEWS_API_URL;
  private readonly FILE_PATH = process.env.NEWS_FILE_PATH;

  async fetchNews(query: string, count: number): Promise<any> {
    try {
      const response = await axios.get(`${this.API_URL}/latest`, {
        params: {
          apikey: this.API_KEY,
          q: query,
          language: 'en',
          size: count, //must be 1-10 for the free version
        },
      });

      const data = response.data.results;
      await this.appendToFile(data);
      return data;
    } catch (error) {
      throw new Error(`Error getting news: ${error.message}`);
    }
  }

  private async appendToFile(newData: any): Promise<void> {
    const filePath = this.FILE_PATH;

    await fs.ensureDir('./data');

    let existingData: any[] = [];

    if (await fs.pathExists(filePath)) {
      try {
        existingData = await fs.readJson(filePath);
        if (!Array.isArray(existingData)) {
          existingData = [];
        }
      } catch (err) {
        console.error(err);
        existingData = [];
      }
    }
    const updatedData = [...existingData, ...newData];

    await fs.writeJson(filePath, updatedData, { spaces: 2 });
  }

  async searchNews(keyword: string): Promise<any> {
    try {
      const data = await fs.readJson(this.FILE_PATH);
      const results = data.filter((article) =>
        article.title.toLowerCase().includes(keyword.toLowerCase()),
      );
      return { results, all: data.length, found: results.length };
    } catch (error) {
      throw new Error('Error reading file.');
    }
  }

  async lastNews(): Promise<any> {
    try {
      const data = await fs.readJson(this.FILE_PATH);
      const results = data.sort((a, b) => b.pubDate - a.pubDate);
      return { latest: results.slice(0, 1) };
    } catch (error) {
      throw new Error('Error reading file.');
    }
  }
}
