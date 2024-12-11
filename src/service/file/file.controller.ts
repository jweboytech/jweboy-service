import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateCanvasDto } from './dto/create.dto';
import * as QRCode from 'qrcode';

@ApiTags('File')
@Controller('file')
export class FileController {
  @Post('canvas')
  @HttpCode(HttpStatus.OK)
  generateCanvas(@Body() dto: CreateCanvasDto) {
    return QRCode.toDataURL(dto.text);
  }
}
