import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as fs from 'fs-extra';

@Injectable()
export class NewsService {
  // TODO create env
  private readonly API_KEY = 'pub_75545638ae93899819f68eaa8703b63e74a06';
  private readonly API_URL = 'https://newsdata.io/api/1';
  private readonly FILE_PATH = './data/news.json';

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
