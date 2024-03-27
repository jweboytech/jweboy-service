import { ApiProperty } from '@nestjs/swagger';
import { Metadata } from '../../../service/metadata/entity/metadata.entity';
import {
  Column,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ length: 20 })
  name: string;

  @ApiProperty()
  @Column('text')
  description: string;

  @ApiProperty()
  @Column()
  filename: string;

  @Column({ type: 'int', nullable: true })
  views: number;

  @Column({ nullable: true })
  isPublished: boolean;

  @ApiProperty({ default: { width: 0, height: 0, compressed: false } })
  // 与 Metadata 进行关联，使用 Relation 避免循环依赖问题
  @OneToOne(() => Metadata, (metadata) => metadata.photo, {
    // 自动保存关联对象
    cascade: true,
  })
  metadata: Relation<Metadata>;
}
