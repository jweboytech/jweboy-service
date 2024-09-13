import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ProjectService } from './project.service';
import { Project } from './entity/project.entity';
import { DeleteProjectDto, QueryProjectDto } from './dto/project.dto';

@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @ApiTags('project')
  @Post('list')
  @HttpCode(HttpStatus.OK)
  async findAll(@Body() dto: QueryProjectDto) {
    const [items, total] = await this.projectService.findAll(dto);
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
  @Put('update')
  @HttpCode(HttpStatus.OK)
  async findOne(@Body() dto: Project) {
    const { id, ...restDto } = dto;
    await this.projectService.updateOne(id, restDto);
    return true;
  }

  @ApiTags('project')
  @Get('detail')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'id',
    required: true,
    description: '项目ID',
    schema: { type: 'number' },
  })
  async findOneByPrimaryKey(@Query('id') id: number) {
    return this.projectService.findOneByPrimaryKey(id);
  }

  @ApiTags('project')
  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  @ApiParam({
    name: 'id',
    required: true,
    description: '项目ID',
    schema: { type: 'number' },
  })
  async deleteOne(@Body() dto: DeleteProjectDto) {
    await this.projectService.deleteOne(dto.id);
    return true;
  }
}
