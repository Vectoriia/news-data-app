import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NewsMongoDocument = NewsMongo & Document;

@Schema()
export class NewsMongo {
  @Prop({ required: true })
  id: string;

  @Prop()
  link: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  ai_org: string;

  @Prop()
  ai_tag: string;

  @Prop()
  content: string;

  @Prop({ type: [String] })
  country: string[];

  @Prop({ type: [String] })
  creator: string[];

  @Prop()
  pubDate: string;

  @Prop({ type: [String] })
  category: string[];

  @Prop({ type: [String] })
  keywords: string[];

  @Prop()
  language: string;

  @Prop()
  ai_region: string;

  @Prop()
  duplicate: boolean;

  @Prop()
  image_url: string;

  @Prop()
  pubDateTZ: string;

  @Prop()
  sentiment: string;

  @Prop()
  source_id: string;

  @Prop()
  video_url: string;

  @Prop()
  article_id: string;

  @Prop()
  source_url: string;

  @Prop()
  description: string;

  @Prop()
  source_icon: string;

  @Prop()
  source_name: string;

  @Prop()
  sentiment_stats: string;

  @Prop()
  source_priority: number;
}

export const NewsMongoSchema = SchemaFactory.createForClass(NewsMongo);
