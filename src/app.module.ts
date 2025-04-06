import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NewsService } from './news/services/news.service';
import { NewsController } from './news/controllers/news.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { NewsSqlEntity } from './news/entities/news-sql.entity';
import { ConfigModule } from '@nestjs/config';
import { NewsSqlService } from './news/services/news-sql.service';
import { NewsMongoService } from './news/services/news-mongo.service';
import { NewsMongoSchema } from './news/entities/news-mongo.schema';
import { MongoNewsController } from './news/controllers/mongo-news.controller';
import { SqlNewsController } from './news/controllers/sql-news.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DB,
      entities: [NewsSqlEntity],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([NewsSqlEntity]),
    MongooseModule.forRoot(
      process.env.MONGO_URI ?? 'mongodb://localhost/news-db',
    ),
    MongooseModule.forFeature([{ name: 'NewsMongo', schema: NewsMongoSchema }]),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [
    AppController,
    NewsController,
    MongoNewsController,
    SqlNewsController,
  ],
  providers: [AppService, NewsService, NewsSqlService, NewsMongoService],
})
export class AppModule {}
