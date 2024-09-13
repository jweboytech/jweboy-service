import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entity/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  findAll() {
    return this.repository
      .createQueryBuilder('category')
      .select()
      .orderBy('category.create_at', 'DESC')
      .getManyAndCount();
  }

  insertOne(dto: Category) {
    return this.repository
      .createQueryBuilder()
      .insert()
      .into(Category)
      .values(dto)
      .execute();
  }

  findOne(name: string) {
    return this.repository
      .createQueryBuilder()
      .where('name = :name', { name })
      .getOne();
  }

  updateOne(id: number, dto: Omit<Category, 'id'>) {
    return this.repository
      .createQueryBuilder()
      .update()
      .where('id = :id', { id })
      .set(dto)
      .execute();
  }

  deleteOne(id: number) {
    return this.repository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  findOneByPrimaryKey(id: number) {
    return this.repository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOne();
  }
}
