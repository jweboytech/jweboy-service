import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RedNote } from './entity/rednote.entity';
import { Repository } from 'typeorm';
import {
  CreateRedNoteDto,
  RedNoteQuery,
  UpdateRedNoteDto,
} from './dto/rednote.dto';

@Injectable()
export class RednoteService {
  constructor(
    @InjectRepository(RedNote)
    private readonly repository: Repository<RedNote>,
  ) {}

  findMany({
    specifiedCondition,
    partiallyFriendly,
    prohibitLanding,
    allowLanding,
    washrooms,
    parking,
  }: RedNoteQuery) {
    return this.repository
      .createQueryBuilder('rednote')
      .select()
      .where('rednote.specified_condition = :specifiedCondition', {
        specifiedCondition,
      })
      .orWhere('rednote.partially_friendly = :partiallyFriendly', {
        partiallyFriendly,
      })
      .orWhere('rednote.prohibit_landing = :prohibitLanding', {
        prohibitLanding,
      })
      .orWhere('rednote.allow_landing = :allowLanding', { allowLanding })
      .orWhere('rednote.washrooms = :washrooms', { washrooms })
      .orWhere('rednote.parking = :parking', { parking })
      .getManyAndCount();
  }

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
