import 'reflect-metadata';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

// 唯一需要持久化的数据库实体：英雄卡。
// name / biography 为核心字段；hints 为 5 条提示语（jsonb 数组，顺序从范围大到范围小），
// 猜错一次就展示下一条提示，5 次机会用完仍未猜中则判定失败。
@Entity({ name: 'heroes' })
export class Hero {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  name!: string;

  @Column({ type: 'text' })
  biography!: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  hints!: string[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}

