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
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Category } from './entity/category.entity';
import { CategoryDto } from './dto/category.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  @ApiTags('category')
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const [items, total] = await this.service.findAll();
    return { items, total };
  }

  @ApiTags('category')
  @Post('create')
  @HttpCode(HttpStatus.OK)
  async createOne(@Body() dto: Category) {
    const record = await this.service.findOne(dto.name);
    if (record == null) {
      const data = await this.service.insertOne(dto);
      return data.identifiers[0].id;
    } else {
      throw new Error('分类已存在');
    }
  }

  @ApiTags('category')
  @Put('update')
  @HttpCode(HttpStatus.OK)
  async findOne(@Body() dto: Category) {
    const { id, ...restDto } = dto;
    await this.service.updateOne(id, restDto);
    return true;
  }

  @ApiTags('category')
  @Get('detail')
  @HttpCode(HttpStatus.OK)
  @ApiQuery({
    name: 'id',
    required: true,
    description: '项目ID',
    schema: { type: 'number' },
  })
  async findOneByPrimaryKey(@Query('id') id: number) {
    return this.service.findOneByPrimaryKey(id);
  }

  @ApiTags('category')
  @Delete('delete')
  @HttpCode(HttpStatus.OK)
  async deleteOne(@Body() dto: CategoryDto) {
    await this.service.deleteOne(dto.id);
    return true;
  }
}
