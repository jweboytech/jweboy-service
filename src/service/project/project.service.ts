import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { Repository } from 'typeorm';
import { QueryProjectDto } from './dto/project.dto';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  findAll(dto: QueryProjectDto) {
    const query = this.projectRepository
      .createQueryBuilder('project')
      .select()
      .orderBy('project.create_at', 'DESC');

    if (dto.category) {
      query.where('categoryId = :categoryId', { categoryId: dto.category });
    }

    if (dto.isPublic) {
      query.where('is_public = :isPublic', { isPublic: dto.isPublic });
    }

    if (dto.type) {
      query.where('type = :type', { type: dto.type });
    }

    return query.getManyAndCount();
  }

  insertOne(dto: Project) {
    return this.projectRepository
      .createQueryBuilder()
      .insert()
      .into(Project)
      .values(dto)
      .execute();
  }

  findOne(name: string) {
    return this.projectRepository
      .createQueryBuilder()
      .where('name = :name', { name })
      .getOne();
  }

  updateOne(id: number, dto: Omit<Project, 'id'>) {
    return this.projectRepository
      .createQueryBuilder()
      .update()
      .where('id = :id', { id })
      .set(dto)
      .execute();
  }

  deleteOne(id: number) {
    return this.projectRepository
      .createQueryBuilder()
      .delete()
      .where('id = :id', { id })
      .execute();
  }

  findOneByPrimaryKey(id: number) {
    return this.projectRepository
      .createQueryBuilder('project')
      .where('project.id = :id', { id })
      .leftJoinAndSelect('project.category', 'category')
      .groupBy('project.id, category.id')
      .getOne();
  }
}
