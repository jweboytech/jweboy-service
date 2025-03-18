import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RedNoteCategory {
  WITH_DOG = 'WITH_DOG',
  WALK_DOG = 'WALK_DOG',
  PET_FRIENDLY = 'PET_FRIENDLY',
  PET_TRAVEL = 'PET_TRAVEL',
}

@Entity()
export class RedNote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ name: 'publish_date', nullable: true })
  publishDate?: string;

  @Column('text', { array: true })
  tags: string[];

  @Column('text', { array: true })
  images: string[];

  @Column()
  href: string;

  @Column({ type: 'enum', enum: RedNoteCategory })
  category: RedNoteCategory;

  /** ======================================= */
  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
