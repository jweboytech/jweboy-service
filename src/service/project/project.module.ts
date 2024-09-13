import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './entity/project.entity';
import { ProjectController } from './project.controller';
import { Category } from '../category/entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Category])],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
