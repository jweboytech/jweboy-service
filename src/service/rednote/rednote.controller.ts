import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes } from '@nestjs/swagger';
import { FileUploadDto } from './dto/file.dto';
import { RednoteService } from './rednote.service';
import { UUID } from 'typeorm/driver/mongodb/bson.typings';
import { RedNoteCategory } from './entity/rednote.entity';
import { CreateRedNoteDto } from './dto/rednote.dto';

@Controller('rednote')
export class RednoteController {
  constructor(private readonly service: RednoteService) {}

  @Post('batch/import')
  @ApiConsumes('multipart/form-data') // 指定请求内容类型为文件上传
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor('file')) // 使用 multer 文件拦截器
  async uploadPem(
    @Body('category') category,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const json = file.buffer.toString();
    const items = JSON.parse(json).map((item) => ({ ...item, category }));
    await this.service.insertOne(items as CreateRedNoteDto[]);
  }

  @Get('all')
  findAll() {
    return this.service.findAll();
  }

  @Post('add')
  async insertOne(addDto: CreateRedNoteDto) {
    await this.service.insertOne(addDto);
  }
}
