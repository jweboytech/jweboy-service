import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  Relation,
} from 'typeorm';
import { Photo } from '../../photo/entity/photo.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Metadata {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column('int')
  width: number;

  @ApiProperty()
  @Column('int')
  height: number;

  @ApiProperty({ default: false })
  @Column()
  compressed: boolean;

  // // 一对一关联，metadata是所有者，对 photo 进行关联
  // @OneToOne(() => Photo)
  // @JoinColumn()
  // photo: Photo;

  // 与 Photo 进行关联，使用 Relation 避免循环依赖问题
  @OneToOne(() => Photo, (photo) => photo.metadata)
  @JoinColumn()
  photo: Relation<Photo>;
}
