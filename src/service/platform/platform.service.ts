import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Platform } from './entity/platform.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlatformService {
  constructor(
    @InjectRepository(Platform)
    private platformRepository: Repository<Platform>,
  ) {}

  findAll() {
    return this.platformRepository
      .createQueryBuilder()
      .orderBy('update_at', 'DESC')
      .getMany();
  }

  findSomeByType(type: string) {
    return this.platformRepository
      .createQueryBuilder()
      .where('type = :type', { type })
      .getMany();
  }

  findSomeByKeywords(keyword: string) {
    return this.platformRepository
      .createQueryBuilder()
      .where('name like :name', { name: `%${keyword}%` })
      .getMany();
  }

  insertOne(dto: Platform) {
    return this.platformRepository
      .createQueryBuilder()
      .insert()
      .into(Platform)
      .values(dto)
      .execute();
  }

  updateOne(id: number, dto: Platform) {
    return this.platformRepository
      .createQueryBuilder()
      .update(Platform)
      .set(dto)
      .where('id = :id', { id })
      .execute();
  }

  findOne(id: number) {
    return this.platformRepository
      .createQueryBuilder()
      .where('id = :id', { id })
      .execute();
  }
}
