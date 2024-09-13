import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../../../service/project/entity/project.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id;

  @ApiProperty({ description: '分类名称' })
  @Column({ length: 20 })
  name: string;

  @Column({ default: false, select: false })
  is_deleted: boolean;

  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;

  @OneToMany(() => Project, (project) => project.category)
  projects: Project[];
}
