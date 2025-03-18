import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedNote } from './entity/rednote.entity';
import { Repository } from 'typeorm';
import { CreateRedNoteDto, UpdateRedNoteDto } from './dto/rednote.dto';

@Injectable()
export class RednoteService {
  constructor(
    @InjectRepository(RedNote)
    private readonly repository: Repository<RedNote>,
  ) {}

  findAll() {
    return this.repository
      .createQueryBuilder('rednote')
      .select()
      .orderBy('rednote.createAt', 'DESC')
      .getManyAndCount();
  }

  insertOne(addDto: CreateRedNoteDto | CreateRedNoteDto[]) {
    return this.repository
      .createQueryBuilder()
      .insert()
      .into(RedNote)
      .values(addDto)
      .execute();
  }

  updateOne(updateDto: UpdateRedNoteDto) {
    return this.repository
      .createQueryBuilder()
      .update(RedNote)
      .set(updateDto)
      .execute();
  }

  findOne(title: string) {
    return this.repository
      .createQueryBuilder()
      .select()
      .where('title = :title', { title })
      .getOne();
  }
}
