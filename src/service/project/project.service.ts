import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  findAll() {
    return this.projectRepository.findAndCount();
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
}
