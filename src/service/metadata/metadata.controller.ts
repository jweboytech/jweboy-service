import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MetadataService } from './metadata.service';
import { Metadata } from './entity/metadata.entity';
import { PhotoService } from '../photo/photo.service';
import { UpdateMetadata } from './entity/update-metadata';

@Controller('metadata')
export class MetadataController {
  constructor(
    private readonly metadataService: MetadataService,
    private readonly photoService: PhotoService,
  ) {}

  @ApiTags('metadata')
  @Post()
  @HttpCode(HttpStatus.OK)
  async save(@Body() dto: Metadata) {
    dto.photo = await this.photoService.findOneBy({ id: 4 });
    return this.metadataService.save(dto);
  }

  @ApiTags('metadata')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async findOneById(@Param() { id }: UpdateMetadata) {
    return this.metadataService.findOneBy({ id });
  }
}
