import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import * as path from 'path';
import * as forge from 'node-forge';
import { readFileSync } from 'fs';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadDto } from './dto/upload.dto';
import { CertificateService } from './certificate.service';
import { getCertificateData } from 'src/utils';
import { TransformCertDTO } from './dto/cert.dto';

@ApiTags('Certificate')
@Controller('certificate')
export class CertificateController {
  constructor(private readonly service: CertificateService) {}

  @Post('transform')
  @HttpCode(HttpStatus.OK)
  async transformPem(@Body() transformDto: TransformCertDTO) {
    const certDto = getCertificateData(transformDto.publicKey);
    const record = await this.service.findOne(certDto.domain);

    if (record == null) {
      await this.service.insertOne(certDto);
    } else {
      await this.service.updateOne(certDto);
    }

    return true;
  }

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data') // 指定请求内容类型为文件上传
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor('file')) // 使用 multer 文件拦截器
  async uploadPem(@UploadedFile() file: Express.Multer.File) {
    const certContent = file.buffer.toString('utf8');
    const addDto = getCertificateData(certContent);
    const record = await this.service.findOne(addDto.domain);

    if (record == null) {
      await this.service.insertOne(addDto);
    } else {
      await this.service.updateOne(addDto);
    }

    return true;
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const [items, total] = await this.service.findAll();
    return { items, total };
  }
}
