import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { PlatformService } from './platform.service';
import { ApiTags } from '@nestjs/swagger';
import { Platform } from './entity/platform.entity';
import { PlatformQuery, UpdatePlatform } from './entity/update-platform';

@Controller('platform')
export class PlatformController {
  constructor(private readonly platformService: PlatformService) {}

  @ApiTags('platform')
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(@Query() { type, keyword }: PlatformQuery) {
    if (keyword != null) {
      return this.platformService.findSomeByKeywords(keyword);
    }
    if (type != null) {
      return this.platformService.findSomeByType(type);
    }
    return this.platformService.findAll();
  }

  @ApiTags('platform')
  @Post()
  @HttpCode(HttpStatus.OK)
  async insertOne(@Body() dto: Platform) {
    await this.platformService.insertOne(dto);
    return true;
  }

  @ApiTags('platform')
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  async updateOne(@Param() { id }: UpdatePlatform, @Body() dto: Platform) {
    await this.platformService.updateOne(id, dto);
    return true;
  }

  @ApiTags('platform')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOne(@Param() { id }: UpdatePlatform) {
    await this.platformService.findOne(id);
    return true;
  }
}
