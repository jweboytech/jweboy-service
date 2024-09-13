import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ProjectType {
  Miniprogram = 'miniprogram',
  h5 = 'h5',
  pc = 'pc',
}

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id;

  @ApiProperty({ description: '项目名称' })
  @Column({ length: 20 })
  name: string;

  @ApiProperty({ description: '项目描述' })
  @Column({ length: 100, nullable: true })
  description: string;

  @ApiProperty({ description: '跳转链接' })
  @Column()
  link: string;

  @ApiProperty({ description: '类型', default: ProjectType.Miniprogram })
  @Column({ type: 'enum', enum: ProjectType })
  type: ProjectType;

  @ApiProperty({ description: '截图' })
  @Column({ type: 'simple-array' })
  screenshots: string[];

  @ApiProperty({ description: '视频' })
  @Column({ nullable: true })
  video: string;

  @Column({ default: false, name: 'is_public' })
  isPublic: boolean;

  @Column({ default: false, select: false })
  is_deleted: boolean;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
