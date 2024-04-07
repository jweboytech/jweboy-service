import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum PlatformType {
  DATABASE = 'database',
}

export enum PlatformTagType {
  MONGO_DB = 'mongodb',
  POSTGRES = 'postgres',
}

@Entity()
export class Platform {
  @PrimaryGeneratedColumn()
  id;

  @CreateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  update_at: Date;

  @ApiProperty()
  @Column({ length: 20 })
  name: string;

  @ApiProperty()
  @Column()
  url: string;

  @ApiProperty()
  @Column({ length: 500, nullable: true })
  description: string;

  @ApiProperty()
  @Column({ enum: PlatformType })
  type: PlatformType;

  @ApiProperty()
  @Column({ enum: PlatformTagType })
  tag: PlatformTagType;

  @Column({ default: false })
  is_deleted: boolean;
}
