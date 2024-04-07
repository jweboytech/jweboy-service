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
      .where('is_deleted = :is_deleted', { is_deleted: false })
      .getMany();
  }

  findSomeByType(type: string) {
    return this.platformRepository
      .createQueryBuilder()
      .where('type = :type', { type })
      .andWhere('is_deleted = :is_deleted', { is_deleted: false })
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
      .getOne();
  }

  removeOne(id: number) {
    return this.platformRepository
      .createQueryBuilder()
      .update(Platform)
      .set({ is_deleted: true })
      .where('id = :id', { id })
      .execute();
  }
}
