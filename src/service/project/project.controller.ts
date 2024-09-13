import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
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

  @ApiTags('project')
  @Post('update')
  @HttpCode(HttpStatus.OK)
  async findOne(@Body() dto: Project) {
    const { id, ...restDto } = dto;
    await this.projectService.updateOne(id, restDto);
    return true;
  }

  @ApiTags('project')
  @Delete('delete/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    required: true,
    description: '项目ID',
    schema: { type: 'number' },
  })
  async deleteOne(@Param('id') id: number) {
    await this.projectService.deleteOne(id);
    return true;
  }
}
