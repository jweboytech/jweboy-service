import {
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

@ApiTags('Certificate')
@Controller('certificate')
export class CertificateController {
  constructor(private readonly service: CertificateService) {}

  @Post('transform')
  @HttpCode(HttpStatus.OK)
  async transformPem() {
    const certFile = path.resolve(__dirname, '../../../jweboy.online.pem');
    const certPem = readFileSync(certFile, 'utf-8');
    const certData = forge.pki.certificateFromPem(certPem);
    const addDto = getCertificateData(certData);
    const record = await this.service.findOne(addDto.domain);

    if (record == null) {
      await this.service.insertOne(addDto);
    }

    return addDto;
  }

  @Post('upload')
  @HttpCode(HttpStatus.OK)
  @ApiConsumes('multipart/form-data') // 指定请求内容类型为文件上传
  @ApiBody({ type: FileUploadDto })
  @UseInterceptors(FileInterceptor('file')) // 使用 multer 文件拦截器
  async uploadPem(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
    const certPem = file.buffer.toString('utf8');
    const certData = forge.pki.certificateFromPem(certPem);
    const addDto = getCertificateData(certData);
    const record = await this.service.findOne(addDto.domain);

    if (record == null) {
      await this.service.insertOne(addDto);
    }

    return addDto;
  }

  @Get('list')
  @HttpCode(HttpStatus.OK)
  async findAll() {
    const [items, total] = await this.service.findAll();
    return { items, total };
  }
}
