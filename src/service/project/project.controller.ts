import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Project } from './entity/project.entity';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiTags('project')
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const [items, total] = await this.projectService.findAll();
    return { items, total };
  }

  @ApiTags('project')
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createOne(@Body() dto: Project) {
    const record = await this.projectService.findOne(dto.name);
    if (record == null) {
      const data = await this.projectService.insertOne(dto);
      return data.identifiers[0].id;
    } else {
      throw new Error('项目已存在');
    }
  }

  // @ApiTags('project')
  // @Post('create')
  // @HttpCode(HttpStatus.OK)
  // async findOne(@Body() dto: Project) {
  //   return this.projectService.findOne(dto);
  // }
}
