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

  @Column({ name: 'specified_condition', nullable: true })
  specifiedCondition: string;

  @Column({ name: 'partially_friendly', nullable: true })
  partiallyFriendly: string;

  @Column({ name: 'prohibit_landing', nullable: true })
  prohibitLanding: string;

  @Column({ name: 'allow_landing', nullable: true })
  allowLanding: string;

  @Column({ nullable: true })
  washrooms: string;

  @Column({ name: 'parking', nullable: true })
  parking: string;

  /** ======================================= */
  @CreateDateColumn({ name: 'create_at' })
  createAt: Date;

  @UpdateDateColumn({ name: 'update_at' })
  updateAt: Date;
}
