import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { PhotoService } from './photo.service';
import { Photo } from './entity/photo.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @ApiTags('photo')
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.photoService.findAll();
  }

  @ApiTags('photo')
  @Post()
  @HttpCode(HttpStatus.OK)
  save(@Body() dto: Photo) {
    return this.photoService.save(dto);
  }

  @ApiTags('photo')
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param() params: Photo) {
    return this.photoService.findOne(params);
  }
}
