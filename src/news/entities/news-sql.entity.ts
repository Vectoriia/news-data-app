import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('news_sql')
export class NewsSqlEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'jsonb' })
  data: any;
}
